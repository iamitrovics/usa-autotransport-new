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

if (current_user_can('manage_options')) {
	function lwp_2629_user_edit_ob_start() {ob_start();}
	add_action( 'personal_options', 'lwp_2629_user_edit_ob_start' );
	function lwp_2629_insert_nicename_input( $user ) {
		$content = ob_get_clean();
		$regex = '/<tr(.*)class="(.*)\buser-user-login-wrap\b(.*)"(.*)>([\s\S]*?)<\/tr>/';
		$nicename_row = sprintf(
			'<tr class="user-user-nicename-wrap"><th><label for="user_nicename">%1$s</label></th><td><input type="text" name="user_nicename" id="user_nicename" value="%2$s" class="regular-text" />' . "\n" . '<span class="description">%3$s</span></td></tr>',
			esc_html__( 'Nicename' ),
			esc_attr( $user->user_nicename ),
			esc_html__( 'Must be unique.' )
		);
		echo preg_replace( $regex, '\0' . $nicename_row, $content );
	}
	add_action( 'show_user_profile', 'lwp_2629_insert_nicename_input' );
	add_action( 'edit_user_profile', 'lwp_2629_insert_nicename_input' );
	function lwp_2629_profile_update( $errors, $update, $user ) {
		if ( !$update ) return;
		if ( empty( $_POST['user_nicename'] ) ) {
			$errors->add(
				'empty_nicename',
				sprintf(
					'<strong>%1$s</strong>: %2$s',
					esc_html__( 'Error' ),
					esc_html__( 'Please enter a Nicename.' )
				),
				array( 'form-field' => 'user_nicename' )
			);
		} else {
			$user->user_nicename = $_POST['user_nicename'];
		}
	}
	add_action( 'user_profile_update_errors', 'lwp_2629_profile_update', 10, 3 );
	}