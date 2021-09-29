<?php
/**
 * Template Name: Why CHoose Us Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_why_hero'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_why_hero'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>

    <section id="costs-area-about">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_why_page_intro'); ?></h2>
                        <?php the_field('intro_text_why_page_intro'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row costs-boxes">
                <?php if( have_rows('why_us_list_page') ): ?>
                    <?php while( have_rows('why_us_list_page') ): the_row(); ?>

                        <div class="col-lg-4 col-md-6">
                            <div class="cost-box">
                                <img src="<?php the_sub_field('icon'); ?>" alt="">
                                <h3><?php the_sub_field('title'); ?></h3>
                                <p><?php the_sub_field('text'); ?></p>
                            </div>
                            <!-- /.cost-box -->
                        </div>
                        <!-- /.col-lg-4 col-md-6 -->

                    <?php endwhile; ?>
                <?php endif; ?>
                <div class="col-lg-4 col-md-6">
                    <div class="cost-box" style="background-image: url(<?php the_field('background_image_cta_why_page'); ?>)">
                        <div class="cb-content">
                            <h3><?php the_field('cta_title_cta_why'); ?></h3>
                            <a href="<?php the_field('button_link_why_cta_about'); ?>" class="costs-btn"><?php the_field('button_label_why_cta_page'); ?></a>
                        </div>
                        <!-- /.cb-content -->
                    </div>
                    <!-- /.cost-box -->
                </div>
                <!-- /.col-lg-4 col-md-6 -->
            </div>
            <!-- /.row costs-boxes -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#costs-area -->

<?php get_footer(); ?>
