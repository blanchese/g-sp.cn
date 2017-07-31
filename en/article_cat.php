<?php

/**
 * ECSHOP 文章分类
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: article_cat.php 17217 2011-01-19 06:29:08Z liubo $
*/


define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}

/* 清除缓存 */
clear_cache_files();

/*------------------------------------------------------ */
//-- INPUT
/*------------------------------------------------------ */

/* 获得指定的分类ID */
if (!empty($_GET['id']))
{
    $cat_id = intval($_GET['id']);
}
elseif (!empty($_GET['category']))
{
    $cat_id = intval($_GET['category']);
}
else
{
    ecs_header("Location: ./\n");

    exit;
}

/* 获得当前页码 */
$page   = !empty($_REQUEST['page'])  && intval($_REQUEST['page'])  > 0 ? intval($_REQUEST['page'])  : 1;

/*------------------------------------------------------ */
//-- PROCESSOR
/*------------------------------------------------------ */

/* 获得页面的缓存ID */
 
    /* 如果页面没有被缓存则重新获得页面的内容 */

    assign_template('a', array($cat_id));
    $position = assign_ur_here($cat_id);
    $smarty->assign('page_title',           $position['title']);     // 页面标题
    $smarty->assign('ur_here',              $position['ur_here']);   // 当前位置

    /* Meta */
    $meta = $db->getRow("SELECT keywords, cat_desc FROM " . $ecs->table('article_cat') . " WHERE cat_id = '$cat_id'");

    if ($meta === false || empty($meta))
    {
        /* 如果没有找到任何记录则返回首页 */
        ecs_header("Location: ./\n");
        exit;
    }
    $smarty->assign('keywords',    htmlspecialchars($meta['keywords']));
    $smarty->assign('description', htmlspecialchars($meta['cat_desc']));
    $smarty->assign('cat_id',    $cat_id);

    $sql="select * from en_article_cat where cat_id=".$cat_id;
    $catinfo=$db->getRow($sql);
    $smarty->assign('catinfo',$catinfo);
    $temp='list_'.$catinfo['type'].".html";
    
    if($catinfo['parent_id']>0){
	    $sql="select cat_name,cat_id from en_article_cat where parent_id=".$catinfo['parent_id']." order by sort_order asc,cat_id asc";
	    $art_cat_list=$db->getAll($sql);
	    $smarty->assign('art_cat_list',$art_cat_list);
    }
    
    if($catinfo['type']=='main'){
    	$sql="select cat_id from en_article_cat where parent_id=".$cat_id." order by sort_order asc,cat_id asc";
    	$res_id=$db->getOne($sql);
    	ecs_header('Location:list-'.$res_id.'.html');
    }elseif($catinfo['type']=='sitemap'){
    	
    	
    }else{
	    /* 获得文章总数 */
	    $size   = isset($_CFG['article_page_size']) && intval($_CFG['article_page_size']) > 0 ? intval($_CFG['article_page_size']) : 20;
	    
	    if($catinfo['type']=='honor'){
	    	$size=8;
	    }elseif($catinfo['type']=='news'){
	    	$size=3;
	    }
	    $count  = get_article_count($cat_id);
	    $pages  = ($count > 0) ? ceil($count / $size) : 1;
	    
	
	    if ($page > $pages)
	    {
	        $page = $pages;
	    }
	    $pager['search']['id'] = $cat_id;
	    $keywords = '';
	    $goon_keywords = ''; //继续传递的搜索关键词
	
	    /* 获得文章列表 */
	    if (isset($_REQUEST['keywords']))
	    {
	        $keywords = addslashes(htmlspecialchars(urldecode(trim($_REQUEST['keywords']))));
	        $pager['search']['keywords'] = $keywords;
	        $search_url = substr(strrchr($_POST['cur_url'], '/'), 1);
	
	        $smarty->assign('search_value',    stripslashes(stripslashes($keywords)));
	        $smarty->assign('search_url',       $search_url);
	        $count  = get_article_count($cat_id, $keywords);
	        $pages  = ($count > 0) ? ceil($count / $size) : 1;
	        if ($page > $pages)
	        {
	            $page = $pages;
	        }
	
	        $goon_keywords = urlencode($_REQUEST['keywords']);
	    }
	    $smarty->assign('artciles_list',    get_cat_articles($cat_id, $page, $size ,$keywords));
	    $smarty->assign('page',$page);
	    /* 分页 */
	    assign_pager('article_cat', $cat_id, $count, $size, '', '', $page, $goon_keywords);
	    assign_dynamic('article_cat');
    }
 
$smarty->display($temp, $cache_id);

?>