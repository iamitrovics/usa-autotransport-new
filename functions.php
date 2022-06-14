<?php
/**
 * CodeFavorite Starter Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package CodeFavorite_Starter_Theme
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/*
* Include files and functions
*/
require_once( __DIR__ . '/inc/theme-settings.php');         // Initialize theme default settings.
require_once( __DIR__ . '/inc/theme-setup.php');            // Theme setup and custom theme supports.
require_once( __DIR__ . '/inc/theme-menus.php');            // Register theme menus.
require_once( __DIR__ . '/inc/theme-widgets.php');          // Register widget area.

require_once( __DIR__ . '/inc/enqueue.php');               // Enqueue scripts and styles.
require_once( __DIR__ . '/inc/ctp.php');                   // Register Custom Post types
require_once( __DIR__ . '/inc/image-sizes.php');           // Custom image sizes

require_once( __DIR__ . '/inc/theme-extras.php');          // Customize theme, extra settings
require_once( __DIR__ . '/inc/theme-cleanup.php');         // Cleaning worpdress garbage
require_once( __DIR__ . '/inc/shortcodes.php');            // Shortcodes
require_once( __DIR__ . '/inc/customizer.php');            // Theme customizer
require_once( __DIR__ . '/inc/hooks.php');                 // Theme Hooks

require_once( __DIR__ . '/inc/wp_bootstrap_mobile_navwalker.php'); 

if ( ! is_admin() ) {

	function fb_filter_query( $query, $error = true ) {

		if ( is_search() ) {
			$query->is_search = false;
			$query->query_vars['s'] = false;
			$query->query['s'] = false;

			if ( $error == true )
				$query->is_404 = true;
		}
	}

	add_action( 'parse_query', 'fb_filter_query' );
	add_filter( 'get_search_form', function() { return null;} );

}

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );