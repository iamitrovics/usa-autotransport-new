<?php
/**
 * Template Name: Contact Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header id="contact-header" class=" page-wrapper" style="background-image: url(<?php the_field('background_image_hero_contact'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_contact_header'); ?></h1>
                        <?php the_field('hero_text_contact_header'); ?>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>

    <section id="contact-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row contact-intro-in">
                <div class="col-xl-8 col-lg-9">
                    <h2><?php the_field('form_title_contact_page'); ?></h2>
                    <?php the_field('form_code_contact_page'); ?>
                </div>
                <!-- /.col-lg-9 -->
                <div class="col-xl-4 col-lg-3">
                    <h3><?php the_field('call_label_contact'); ?></h3>
                    <div class="call-btn">
                        <a href="tel:8556753451"><i class="fas fa-phone-alt"></i> <?php the_field('phone_number_call_label'); ?></a>
                    </div>
                </div>
                <!-- /.col-lg-4 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#contact-about-area"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <!-- /#services-intro-area -->

    <div id="contact-about-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_contact_page_contact'); ?></h2>
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
                            <div class="about-photo overlayed" style="background-image: url(<?php the_field('background_image_contact_page_about'); ?>);">
                                <div class="ap-content">
                                    <div class="ap-text">
                                        <?php the_field('about_text_contact_page'); ?>
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
                                <?php the_field('about_main_text_contact_page'); ?>
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
                                    <a href="<?php the_field('button_link_contact_cta'); ?>"><?php the_field('button_label_contact_cta'); ?></a>
                                </div>
                                <!-- /.ap-cta -->
                                <img src="<?php the_field('background_image_contact_cta'); ?>" alt="" class="ap-photo">
                            </div>
                            <!-- /.about-photo -->
                        </div>
                        <div class="col-lg-7">
                            <div class="about-content">
                                <?php the_field('content_block_bottom'); ?>
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
    <!-- /#contact-about-area -->

<?php get_footer(); ?>
