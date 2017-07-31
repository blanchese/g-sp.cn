<?php

/**
 * ECSHOP WAP首页
 * ============================================================================
 * * 版权所有 2005-2012 上海商派网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.ecshop.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liubo $
 * $Id: index.php 17217 2011-01-19 06:29:08Z liubo $
*/

define('IN_ECS', true);
define('ECS_ADMIN', true);
 
require(dirname(__FILE__) . '/includes/init.php');

$position = assign_ur_here();
$smarty->assign('page_title',      $position['title']);    // 页面标题
$smarty->assign('ur_here',         $position['ur_here']);  // 当前位置

/* meta information */
$smarty->assign('keywords',        htmlspecialchars($_CFG['shop_keywords']));
$smarty->assign('description',     htmlspecialchars($_CFG['shop_desc']));

$sql="select goods_name,goods_id,goods_img,shop_price,market_price from ecs_goods where is_delete=0 and is_on_sale=1 and is_hot=1 order by click_count desc limit 6 ";
$hot_pro_list=$db->getAll($sql);
$smarty->assign('hot_pro_list',$hot_pro_list);

$banner_ad=get_ad_list(1,5);
 

$smarty->assign('banner_ad',$banner_ad);
$smarty->display("index.html");

?>
