<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package CodeFavorite_Starter_Theme
 */

get_header();
?>

<header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_ermac', 'options'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-caption">
                    <h1><?php the_field('main_title_ermac', 'options'); ?></h1>
                    <?php the_field('content_block_ermac', 'options'); ?>
                </div>
                <!-- /.header-caption -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</header>

<?php
get_footer();
