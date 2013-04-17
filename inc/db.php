<?php
class SimpleDB
{
    /**
     * 连接标识
     * @var resource
     */
    var $dbLink;
    /**
     * 数据库查询语句
     * @var string
     */
    var $dbSql;
    /**
     * 查询结果
     * @var resource
     */
    var $dbResult;
    /**
     * 查询记录集
     * @var array
     */
    var $dbRecord;
    /**
     * 数据库字符集
     * @var string
     */
    var $dbCharset = 'UTF8';
    /**
     * 数据库结果集提取方式
     * @var int
     */
    var $fetchMode = MYSQL_ASSOC;
    /**
     * 日志保存路径
     * @var string
     */
    var $logPath = '/tmp/mysql_log';
    
    /**
     * 是否记录SQL查询失败的SQL日志,缺省是false
     * @var bool
     */
    var $isLog = false;
    /**
     * 是否在SQL查询出错的时候显示错误并且终止脚本执行,缺省是true
     *
     * @var bool
     */
    var $isError = true;
    
    
    //--------------------------
    // 内部接口
    //--------------------------
    /**
     * 构造函数
     * 
     * @param string $db_host 连接主机
     * @param string $db_user 连接用户
     * @param string $db_passwd 数据库密码
     * @param string $db_name 数据库
     * @param bool $is_pconnect 是否长连接,默认是否
     * @return SimpleDB
     */
    function SimpleDB($db_host, $db_user, $db_passwd, $db_name, $is_pconnect=false){
        $this->connect($db_host, $db_user, $db_passwd, $db_name, $is_pconnect);
    }
    
    /**
     * 连接数据库
     *
     * @param string $db_host  数据库主机地址,例如:localhost,或者 localhost:3306
     * @param string $db_user 连接数据库的用户
     * @param string $db_passwd 用户密码
     * @param string $db_name 数据库名字
     * @param boo $is_pconnect 是否使用长连接
     * @return resource 返回连接资源标识符
     */
    function connect($db_host, $db_user, $db_passwd, $db_name, $is_pconnect){
        if ($is_pconnect){
            return $this->dbLink = mysql_pconnect($db_host, $db_user, $db_passwd);
        }
        $this->dbLink = @mysql_connect($db_host, $db_user, $db_passwd);
        mysql_select_db($db_name, $this->dbLink);
        $mysql_version = $this->getOne("SELECT VERSION()");
        if ($this->dbCharset!='' && preg_match("/^(5.|4.1)/", $mysql_version)){
            $this->query("SET NAMES '$this->dbCharset'", $this->dbLink);
        }
        return $this->dbLink;
    }
    
    /**
     * 关闭数据库连接
     *
     * @return bool 是否成功关闭连接
     */
    function disconnect(){
        $ret = @mysql_close($this->dbLink);
        $this->dbLink = null;
        return $ret;
    }
    /**
     * 设置查询结果返回数据类型
     *
     * @param int $modeType 设置查询结果返回设置,1为关联索引和数字所有都有,2为使用关联索引,3为使用数字索引
     */
    function setFetchMode($modeType){
        return;
        switch ($modeType){
            case 1:    //数字索引和关联索引都有
                $this->fetchMode = MYSQL_BOTH;
                break;
            case 2:    //使用关联索引
                $this->fetchMode = MYSQL_ASSOC;
                break;
            case 3: //使用数字索引
                $this->fetchMode = MYSQL_NUM;
                break;
            default://缺省使用关联索引
                $this->fetchMode = MYSQL_ASSOC;
        }
    }
    
    /**
     * 设置数据库客户端提取结果集的字符编码
     *
     * @param string $charset 编码的字符串,比如 UTF8,GBK之类的,缺省是GBK
     */
    function setCharset($charset){
        if ($charset != ''){
            $this->dbCharset = $charset;
        }
    }
    
    /**
     * 设置日志存储路径
     *
     * @param string $log_path 日志路径,该必须是可写的
     */
    function setLogPath($log_path){
        if ($log_path != ''){
            $this->logPath = $log_path;
        }
    }
    
    /**
     * 写SQL执行日志
     *
     * @param string $sql 查询的SQL语句
     * @param string $file 当前执行查询的文件
     */
    function writeLog($sql, $file){
        if (!file_exists($this->logPath)){
                @mkdir($this->logPath);
        }
        $log_file = $this->logPath ."/mysql_".date("Y-m-d").".log";
        $log_msg = "[".date("Y-m-d H:i:s")."] - ".$file.": ".$sql." ";
        error_log($log_msg, 3, $log_file);                
    }
    
    /**
     * 显示上依次SQL执行错误的错误信息
     */
    function showError(){
        $errMessage = "MySQL query error ". mysql_errno($this->dbLink) .": ". mysql_error($this->dbLink);
        die($errMessage);
    }
    
    /**
     * 返回MySQL的版本信息
     *
     * @return string Mysql的版本
     */
    function getVersion(){
        return $this->getOne("SELECT VERSION()");
    }   
    /**
     * 查询操作的底层接口
     *
     * @param string $sql 要执行查询的SQL语句
     * @return bool 执行成功返回true,失败返回false
     */
    function query($sql){
        $this->dbSql = $sql;
        $this->dbResult = null;
        $this->dbResult = @mysql_query($sql, $this->dbLink);
        if ($this->dbResult === false){
            if ($this->isLog){
                $this->writeLog($sql, __FILE__);
            }
            if ($this->isError){
                $this->showError();
            }
            return false;
        }
        return true;    
    }    
   
    //--------------------------
    // 数据获取接口
    //--------------------------
    /**
     * 获取SQL执行的全部结果集(二维数组)
     *
     * @param string $sql 需要执行查询的SQL语句
     * @return 成功返回查询结果的二维数组,失败返回false
     */
    function getAll($sql){
        if (!$this->query($sql)){
            return false;
        }
        $this->dbRecord = array();
        while ($row = @mysql_fetch_assoc($this->dbResult)) {
            $this->dbRecord[] = $row;
        }
        @mysql_free_result($this->dbResult);
        if (!is_array($this->dbRecord) || empty($this->dbRecord)){
            return false;
        }
        return $this->dbRecord;
    }
    
    /**
     * 获取单行记录(一维数组)
     *
     * @param string $sql 需要执行查询的SQL语句
     * @return 成功返回结果记录的一维数组,失败返回false
     */
    function getRow($sql){
        if (!$this->query($sql)){
            return false;
        }
        $this->dbRecord = array();
        $this->dbRecord = @mysql_fetch_assoc($this->dbResult);
        @mysql_free_result($this->dbResult);
        if (!is_array($this->dbRecord) || empty($this->dbRecord)){
            return false;
        }
        return $this->dbRecord;
    }
    
    /**
     * 获取一列数据(一维数组)
     *
     * @param string $sql 需要获取的字符串
     * @param string $field 需要获取的列,如果不指定,默认是第一列
     * @return 成功返回提取的结果记录的一维数组,失败返回false
     */
    function getCol($sql, $field=''){
        if (!$this->query($sql)){
            return false;
        }
        $this->dbRecord = array();
        while($row = @mysql_fetch_assoc($this->dbResult)){
            if (trim($field) == ''){
                $this->dbRecord[] = current($row);
            } else {
                $this->dbRecord[] = $row[$field];
            }
        }
        @mysql_free_result($this->dbResult);
        if (!is_array($this->dbRecord) || empty($this->dbRecord)){
            return false;
        }
        return $this->dbRecord;        
    }
    
    /**
     * 获取一个数据(当条数组)
     *
     * @param string $sql 需要执行查询的SQL
     * @return 成功返回获取的一个数据,失败返回false
     */
    function getOne($sql, $field=''){
        if (!$this->query($sql)){
            return false;
        }
        $this->dbRecord = array();
        $row = @mysql_fetch_assoc($this->dbResult);
        @mysql_free_result($this->dbResult);
        if (!is_array($row) || empty($row)){
            return false;
        }
        if (trim($field) != ''){
            $this->dbRecord = $row[$field];
        }else{
            $this->dbRecord = current($row);
        }
        return $this->dbRecord;
    }
    /**
     * 获取指定各种条件的记录
     *
     * @param string $table 表名(访问的数据表)
     * @param string $field 字段(要获取的字段)
     * @param string $where 条件(获取记录的条件语句,不包括WHERE,默认为空)
     * @param string $order 排序(按照什么字段排序,不包括ORDER BY,默认为空)
     * @param string $limit 限制记录(需要提取多少记录,不包括LIMIT,默认为空)
     * @param bool $single 是否只是取单条记录(是调用getRow还是getAll,默认是false,即调用getAll)
     * @return 成功返回记录结果集的数组,失败返回false
     */
    function getRecord($table, $field='*', $where='', $order='', $limit='', $single=false){
        $sql = "SELECT $field FROM $table";
        $sql .= trim($where)!='' ? " WHERE $where " : $where;
        $sql .= trim($order)!='' ? " ORDER BY $order" : $order;
        $sql .= trim($limit)!='' ? " LIMIT $limit" : $limit;
        if ($single){
            return $this->getRow($sql);
        }
        return $this->getAll($sql);
    }
    
    /**
     * 获取指点各种条件的记录(跟getRecored类似)
     *
     * @param string $table 表名(访问的数据表)
     * @param string $field 字段(要获取的字段)
     * @param string $where 条件(获取记录的条件语句,不包括WHERE,默认为空)
     * @param array $order_arr 排序数组(格式类似于: array('id'=>true), 那么就是按照ID为顺序排序, array('id'=>false), 就是按照ID逆序排序)
     * @param array $limit_arr 提取数据的限制数组()
     * @return unknown
     */
    function getSpecifyRecord($table, $field='*', $where='', $order_arr=array(), $limit_arr=array()){
        $sql = "SELECT $field FROM $table";
        $sql .= trim($where)!='' ? " WHERE $where " : $where;
        if (is_array($order_arr) && !empty($order_arr)){
            $arr_key = key($order_arr);
            $sql .= " ORDER BY $arr_key " . ($order_arr[$arr_key] ? "ASC" : "DESC");
        }
        if (is_array($limit_arr) && !empty($limit_arr)){
            $start_post = intval(array_shift($limit_arr));
            $offset = intval(array_shift($limit_arr));
            $sql .= " LIMIT $start_post,$offset";
        }
        return $this->getAll($sql);
    }    
    
    /**
     * 获取指定条数的记录
     *
     * @param string $table 表名
     * @param int $start_pos 开始记录
     * @param int $offset 偏移量
     * @param string $field 字段名
     * @param string $where 条件(获取记录的条件语句,不包括WHERE,默认为空)
     * @param string $order 排序(按照什么字段排序,不包括ORDER BY,默认为空)
     * @return 成功返回包含记录的二维数组,失败返回false
     */
    function getLimitRecord($table, $start_pos, $offset, $field='*', $where='', $oder=''){
        $sql = "SELECT $field FROM $table";
        $sql .= trim($where)!='' ? " WHERE $where " : $where;
        $sql .= trim($order)!='' ? " ORDER BY $order" : $order;
        $sql .= "LIMIT $start_pos,$offset";
        return $this->getAll($sql);
    }
    
    /**
     * 获取排序记录
     *
     * @param string $table 表名
     * @param string $order_field 需要排序的字段(比如id)
     * @param string $order_method 排序的方式(1为顺序, 2为逆序, 默认是1)
     * @param string $field 需要提取的字段(默认是*,就是所有字段)
     * @param string $where 条件(获取记录的条件语句,不包括WHERE,默认为空)
     * @param string $limit 限制记录(需要提取多少记录,不包括LIMIT,默认为空)
     * @return 成功返回记录的二维数组,失败返回false
     */
    function getOrderRecord($table, $order_field, $order_method=1, $field='*', $where='', $limit=''){
        //$order_method的值为1则为顺序, $order_method值为2则2则是逆序排列
        $sql = "SELECT $field FROM $table";
        $sql .= trim($where)!='' ? " WHERE $where " : $where;
        $sql .= " ORDER BY $order_field " . ( $order_method==1 ? "ASC" : "DESC");
        $sql .= trim($limit)!='' ? " LIMIT $limit" : $limit;
        return $this->getAll($sql);
    }
    
    /**
     * 分页查询(限制查询的记录条数)
     *
     * @param string $sql 需要查询的SQL语句
     * @param int $start_pos 开始记录的条数
     * @param int $offset 每次的偏移量,需要获取多少条
     * @return 成功返回获取结果记录的二维数组,失败返回false
     */
    function limitQuery($sql, $start_pos, $offset){
        $start_pos = intval($start_pos);
        $offset = intval($offset);
        $sql = $sql . " LIMIT $start_pos,$offset ";
        return $this->getAll($sql);
    }    
    
    
    //--------------------------
    // 无数据返回操作
    //--------------------------
    /**
     * 执行执行非Select查询操作
     *
     * @param string $sql 查询SQL语句
     * @return bool  成功执行返回true, 失败返回false
     */
    function execute($sql){
        if (!$this->query($sql)){
            return false;
        }
        $count = @mysql_affected_rows($this->dbLink);
        if ($count <= 0){
            return false;
        }
        return true;
    }
    
    /**
     * 自动执行操作(针对Insert/Update操作)
     *
     * @param string $table 表名
     * @param array $field_array 字段数组(数组中的键相当于字段名,数组值相当于值, 类似 array( 'id' => 100, 'user' => 'heiyeluren')
     * @param int $mode 执行操作的模式 (是插入还是更新操作, 1是插入操作Insert, 2是更新操作Update)
     * @param string $where 如果是更新操作,可以添加WHERE的条件
     * @return bool 执行成功返回true, 失败返回false
     */
    function autoExecute($table, $field_array, $mode, $where=''){
        if ($table=='' || !is_array($field_array) || empty($field_array)){
            return false;
        }
        //$mode为1是插入操作(Insert), $mode为2是更新操作
        if ($mode == 1){
            $sql = "INSERT INTO $table SET ";
        }else{
            $sql = "UPDATE $table SET ";
        }
        foreach ($field_array as $key => $value){
            $sql .= "$key='$value',";
        }
		//echo $sql;
        $sql = rtrim($sql, ',');
        if ($mode==2 && $where!=''){
            $sql .= "WHERE $where";
        }
		//echo $sql;
        return $this->execute($sql);
    }
    
    
    //--------------------------
    // 其他数据相关操作
    //--------------------------
    /**
     * 获取最后一次查询的SQL语句
     *
     * @return string 返回最后一次查询的SQL语句
     */
    function getLastSql(){
        return $this->dbSql;
    }
        
    /**
     * 获取上次插入操作的的ID
     *
     * @return int 如果没有连接或者查询失败,返回0, 成功返回ID
     */
    function getLastId(){
        if (!$this->dbLink){
            return 0;
        }
        if (($last_id = mysql_insert_id($this->dbLink)) > 0){
            return $last_id;
        }
        return $this->getOne("SELECT LAST_INSERT_ID()");
    }
    
    /**
     * 获取记录集里面的记录条数 (用于Select操作)
     *
     * @return int 如果上一次无结果集或者记录结果集为空,返回0, 否则返回结果集数量
     */
    function getNumRows(){
        if (!$this->dbResult){
            return 0;
        }
        return mysql_num_rows($this->dbResult);
    }
    
    /**
     * 获取受到影响的记录数量 (用于Update/Delete/Insert操作)
     *
     * @return int 如果没有连接或者影响记录为空, 否则返回影响的行数量
     */
    function getAffectedRows(){
        if (!$this->dbLink){
            return 0;
        }
        return mysql_affected_rows($this->dbLink);
    }
}
?>