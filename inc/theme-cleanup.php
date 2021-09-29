<?php
/**
 * Clean the wordpress
 *
 * @package CodeFavorite_Starter_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
// Emoji detection script.
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
// Emoji styles.
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/*
Show less info to users on failed login for security.
(Will not let a valid username be known.)
*/
function show_less_login_info() { 
    return "<strong>ERROR</strong>: Stop guessing!"; }
add_filter( 'login_errors', 'show_less_login_info' );

/* 
* Disable email login
*/
remove_filter( 'authenticate', 'wp_authenticate_email_password', 20 );

/*
* Do not generate and display WordPress version
*/
function no_generator()  { 
    return ''; }
add_filter( 'the_generator', 'no_generator' );  

function author_link(){
    global $comment;
    $comment_ID = $comment->user_id;
    $author = get_comment_author( $comment_ID );
    $url = get_comment_author_url( $comment_ID );
    if ( empty( $url ) || 'http://' == $url )
      $return = $author;
    else
      $return = "$author";
    return $return;
  }
  add_filter('get_comment_author_link', 'author_link');
  
  
  // Remove WP version from RSS.
  if ( ! function_exists( 'blanktheme_remove_rss_version' ) ) :
  function blanktheme_remove_rss_version() { return ''; }
  endif;
  
  // Remove injected CSS for recent comments widget.
  if ( ! function_exists( 'blanktheme_remove_wp_widget_recent_comments_style' ) ) :
  function blanktheme_remove_wp_widget_recent_comments_style() {
    if ( has_filter( 'wp_head', 'wp_widget_recent_comments_style' ) ) {
      remove_filter( 'wp_head', 'wp_widget_recent_comments_style' );
    }
  }
  endif;
  
  // Remove injected CSS from recent comments widget.
  if ( ! function_exists( 'blanktheme_remove_recent_comments_style' ) ) :
  function blanktheme_remove_recent_comments_style() {
    global $wp_widget_factory;
    if ( isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments']) ) {
    remove_action( 'wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style') );
    }
  }
  endif;

// remove comments menu 
function remove_admin_menu_items() {
	$remove_menu_items = array(__('Comments'));
	global $menu;
	end ($menu);
	while (prev($menu)){
		$item = explode(' ',$menu[key($menu)][0]);
		if(in_array($item[0] != NULL?$item[0]:"" , $remove_menu_items)){
		unset($menu[key($menu)]);}
	}
}

add_action('admin_menu', 'remove_admin_menu_items');

function my_footer_remover() {
  remove_filter( 'update_footer', 'core_update_footer' ); 
}

add_action( 'admin_menu', 'my_footer_remover' );

/*
* Remove welcome screen
*/
remove_action('welcome_panel', 'wp_welcome_panel');

/*
* Remove XML-RPC
*/
add_filter('xmlrpc_enabled', '__return_false');

// remove p
add_filter( 'wpcf7_autop_or_not', '__return_false' );

add_action('init', 'init_remove_support',100);
function init_remove_support(){
    $post_type = 'post';
    remove_post_type_support( $post_type, 'editor');
}

function wpex_remove_cpt_slug( $post_link, $post, $leavename ) {
	if ( 'cities' != $post->post_type || 'publish' != $post->post_status ) {
		return $post_link;
	}
	$post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
	return $post_link;
}
add_filter( 'post_type_link', 'wpex_remove_cpt_slug', 10, 3 );


function wpex_remove_cpt_slug_services( $post_link, $post, $leavename ) {
	if ( 'services' != $post->post_type || 'publish' != $post->post_status ) {
		return $post_link;
	}
	$post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
	return $post_link;
}
add_filter( 'post_type_link', 'wpex_remove_cpt_slug_services', 10, 3 );


/**
 * Some hackery to have WordPress match postname to any of our public post types
 * All of our public post types can have /post-name/ as the slug, so they better be unique across all posts
 * Typically core only accounts for posts and pages where the slug is /post-name/
 */
function wpex_parse_request_tricksy( $query ) {
	// Only noop the main query
	if ( ! $query->is_main_query() )
		return;
	// Only noop our very specific rewrite rule match
	if ( 2 != count( $query->query ) || ! isset( $query->query['page'] ) ) {
		return;
	}
	// 'name' will be set if post permalinks are just post_name, otherwise the page rule will match
	if ( ! empty( $query->query['name'] ) ) {
		$query->set( 'post_type', array( 'post', 'cities', 'page', 'services' ) );
	}
}
add_action( 'pre_get_posts', 'wpex_parse_request_tricksy' );


function cf7_post_to_third_party($form)
{
    $formMappings = array(
        'first_name' => array('your-first'),
		'last_name' => array('your-last'),
		'email' => array('your-email'),
		'phone' => array('your-tel'),
		'move_date' => array('your-date'),
		'move_size' => array('home-size'),
		'from_zip' => array('zip-from'),
		'to_zip' => array('zip-to'),
		'car_trailer' => array('your-trailer'),
		'car_make' => array('car-make'),
		'car_model' => array('car-model'),
		'car_year' => array('car-year'),
        'source_details[url]' => array('dynamichidden-672'),
        'source_details[title]' => array('dynamichidden-673')
    );
    $handler = new MovingSoftFormHandler($formMappings);
    $handler->setOrigin('https://usa-autotransport.com')->handleCF7($form, [12236, 12244]);
}
add_action('wpcf7_mail_sent', 'cf7_post_to_third_party', 10, 1);


function skip_mail_when_testing($f){
    $submission = WPCF7_Submission::get_instance();
    $handler = new MovingSoftFormHandler();
    
    return $handler->getIP() == '206.189.212.83'; //testing Bot IP address
}
add_filter('wpcf7_skip_mail','skip_mail_when_testing');

add_filter( 'use_block_editor_for_post', '__return_false' );

add_filter('wpcf7_autop_or_not', '__return_false');
