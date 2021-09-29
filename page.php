<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeFavorite_Starter_Theme
 */

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_regular_header'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_regular_header'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <div id="regular-page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <?php if( have_rows('content_layout_main') ): ?>
                        <?php while( have_rows('content_layout_main') ): the_row(); ?>
                            <?php if( get_row_layout() == 'full_width_content' ): ?>

                                <?php the_sub_field('content_block'); ?>

                            <?php elseif( get_row_layout() == 'image' ): ?>


                            <?php endif; ?>
                        <?php endwhile; ?>
                    <?php endif; ?>

                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </div>

<?php
get_footer();
