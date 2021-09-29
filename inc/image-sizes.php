<?php
/**
 * Custom image sizes
 *
 * @package CodeFavorite_Starter_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// general
add_image_size('preview-image', 300, 200, TRUE);
add_image_size('full-image', 1400, 9999, FALSE);

// Home
add_image_size('about-image', 580, 580, TRUE);
add_image_size('thumb-image', 400, 300, TRUE);
add_image_size('blog-image', 550, 320, TRUE);