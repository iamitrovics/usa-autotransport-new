<?php
/**
 * Template Name: Services Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_services_hero'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_services_hero'); ?></h1>
                        <?php the_field('hero_text_services_hero'); ?>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <section id="services-intro-area" class="trailer-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <img src="<?php bloginfo('template_directory'); ?>/img/ico/stars.png" alt="" class="stars">
                    <div class="services-intro-content">
                        <?php the_field('column_left_content_services_page'); ?>  
                    </div>
                    <!-- /.services-intro-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#about-area"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <!-- /#services-intro-area -->


    <div id="about-area" class="about-services">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('block_title_open_trailers'); ?></h2>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="about-items">
                <section class="about-item">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="about-photo overlayed" style="background-image: url(<?php the_field('featured_image_open_trailers'); ?>);">
                                <div class="ap-content">
                                    <div class="ap-heading">
                                        <img src="<?php the_field('service_icon_open_trailers'); ?>" alt="" class="ap-ico">
                                    </div>
                                    <!-- /.ap-heading -->
                                    <div class="ap-text">
                                        <?php the_field('intro_text_open_trailers'); ?>
                                    </div>
                                    <!-- /.ap-text -->
                                </div>
                                <!-- /.ap-content -->
                            </div>
                            <!-- /.about-photo -->
                        </div>
                        <!-- /.col-lg-5 -->
                        <div class="col-lg-7">
                            <div class="about-content">
                                <?php the_field('content_block_open_trailers'); ?>
                            </div>
                            <!-- /.about-content -->
                        </div>
                        <!-- /.col-lg-7 -->
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.about-item -->
                <section class="about-item">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="about-photo">
                                <div class="ap-content"></div>
                                <!-- /.ap-content -->
                                <div class="ap-cta">
                                    <a href="<?php the_field('button_link_open_trailer'); ?>"><?php the_field('button_label_open_trailers'); ?></a>
                                </div>
                                <!-- /.ap-cta -->
                                <img src="<?php the_field('service_image_open_trailer'); ?>" alt="" class="ap-photo">
                            </div>
                            <!-- /.about-photo -->
                        </div>
                        <div class="col-lg-7">
                            <div class="about-content">
                                <?php the_field('bottom_content_open_trailers'); ?>
                            </div>
                            <!-- /.about-content -->
                        </div>
                        <!-- /.col-lg-7 -->
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.about-item -->
            </div>
            <!-- /.about-items -->
        </div>
        <!-- /.container -->
        <div class="about-bottom-shade"></div>
        <div class="about-rb-shape"></div> 
    </div>
    <!-- /#about-area -->

    <section id="trailer-choose" class="service-choose" style="background-image: url(<?php the_field('background_image_enclosed_bg'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_enclosed_services'); ?></h2>
                    </div>
                    <!-- /.section-intro -->
                    <div class="choose-content">
                        <div class="cc-in">
                            <?php the_field('content_block_enclosed_main'); ?>
                        </div>
                        <!-- /.cc-in -->
                    </div>
                    <!-- /.choose-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#trailer-choose -->


    <section id="service-benefits">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_benefits_services'); ?></h2>
                        <?php the_field('intro_text_benefits_services'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row benefit-boxes">

            <?php if( have_rows('benefits_list_services') ): ?>
                <?php while( have_rows('benefits_list_services') ): the_row(); ?>

                    <div class="col-lg-6">
                        <div class="benefit-box">
                            <img src="<?php the_sub_field('icon'); ?>" alt="">
                            <div class="bb-in">
                                <h3><?php the_sub_field('title'); ?></h3>
                                <p><?php the_sub_field('text'); ?></p>
                            </div>
                            <!-- /.bb-in -->
                        </div>
                        <!-- /.benefit-box -->
                    </div>
                    <!-- /.col-lg-6 -->

                <?php endwhile; ?>
            <?php endif; ?>

            </div>
            <!-- /.row benefit-boxes -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#service-benefits -->


    <section id="insurance-area" style="background-image: url(<?php the_field('background_image_insurance'); ?>)">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="insirance-in">
                        <div class="row">
                            <div class="col-lg-5">
                                <h2><?php the_field('section_title_insurance_page'); ?></h2>
                            </div>
                            <!-- /.col-lg-5 -->
                            <div class="col-lg-7">
                                <div class="insurance-text">
                                    <?php the_field('content_block_insurance'); ?>
                                </div>
                                <!-- /.insurance-text -->
                            </div>
                            <!-- /.col-lg-7 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.insirance-in -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#insurance-area -->

    <section id="bottom-quote" class="enclosed-quote service-quote">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="bq-content">
                        <h2><?php the_field('block_title_bottom_cta_serv'); ?></h2>
                        <?php the_field('content_block_bottom_cta_serv'); ?>
                    </div>
                    <!-- /.bq-content -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6">
                    <div class="quote-form">
                        <div class="quote-form-in">
                            <div class="rib"><?php the_field('form_title_bottom_cta_services'); ?>
                                <div class="shad"></div>
                            </div>

                             <?php the_field('form_code_quote_form_single', 'options'); ?>

                        </div>
                        <!-- /.quote-form-in -->
                    </div>
                    <!-- /.quote-form -->
                </div>
                <!-- /.col-lg-6 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#bottom-quote -->


<?php get_footer(); ?>
