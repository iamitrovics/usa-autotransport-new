<?php
/**
 * Template Name: Moving Services Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_moving_header'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('hero_title_moving_header'); ?></h1>
                        <p><?php the_field('hero_text_moving_header'); ?></p>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>

    <section id="about-intro-area" class="trailer-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <img src="<?php bloginfo('template_directory'); ?>/img/ico/stars.png" alt="" class="stars">
                    <div class="about-intro-content">
                        <?php the_field('intro_text_moving_services'); ?>
                    </div>
                    <!-- /.about-intro-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#about-main"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <!-- /#about-intro-area -->

    <div id="trailer-main">

        <div class="container">

            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="tm-intro enclosed-tm-intro">
                        <h2><?php the_field('section_title_about_moving'); ?></h2>
                    </div>
                    <!-- /.tm-intro -->
                    <div class="about-intro">
                        <?php the_field('intro_text_about_services'); ?>
                    </div>
                    <!-- // about intro  -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->

            <div class="about-items">

                <?php if( have_rows('about_blocks_moving_services') ): ?>
                    <?php while( have_rows('about_blocks_moving_services') ): the_row(); ?>

                        <section class="full-item">
                            <div class="row">
                                <div class="col-lg-7 content-col">
                                    <div class="about-content about-content--margin-top">
                                        <?php the_sub_field('content_block'); ?>
                                    </div>
                                    <!-- /.about-content -->
                                </div>
                                <!-- /.col-lg-8 -->
                                <div class="col-lg-5 image-col">
                                    <div class="about-photo">
                                        <div class="ap-content"></div>
                                        <!-- /.ap-content -->
                                        <img src="<?php the_sub_field('featured_image'); ?>" alt="" class="ap-photo">
                                        <div class="shade"></div>
                                        <!-- /.shade -->
                                    </div>
                                    <!-- /.about-photo -->
                                </div>
                                <!-- /.col-lg-4 -->
                            </div>
                            <!-- /.row -->
                        </section>
                        <!-- /.about-item -->

                    <?php endwhile; ?>
                <?php endif; ?>

            </div>
            <!-- /.about-items -->

            <div class="trailer-why"  style="background-image: url(<?php the_field('background_image_help'); ?>);">
                <div class="row">
                    <div class="col-md-12">
                        <div class="tw-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="tw-intro">
                                        <h2><?php the_field('block_title_help'); ?></h2>
                                    </div>
                                    <!-- /.tw-intro -->
                                </div>
                                <!-- /.col-md-6 -->
                                <div class="col-md-6">
                                    <div class="tw-text">
                                        <?php the_field('content_block_help'); ?>
                                    </div>
                                    <!-- /.tw-text -->
                                </div>
                                <!-- /.col-md-6 -->
                            </div>
                            <!-- /.row -->
                        </div>
                        <!-- /.tw-content -->
                    </div>
                    <!-- /.col-md-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.trailer-why -->

            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="tm-intro enclosed-tm-intro">
                            <h2><?php the_field('section_title_main_moving'); ?></h2>
                        </div>
                        <!-- /.tm-intro -->
                        <div class="about-intro">
                            <?php the_field('intro_text_moving_main'); ?>
                        </div>
                        <!-- // about intro  -->
                    </div>
                    <!-- /.col-md-12 -->
                </div>
                <!-- /.row -->            
                
                <div class="about-items">

                    <?php if( have_rows('content_blocks_main_moving') ): ?>
                        <?php while( have_rows('content_blocks_main_moving') ): the_row(); ?>

                            <section class="full-item">
                                <div class="row">
                                    <div class="col-lg-7 content-col">
                                        <div class="about-content about-content--margin-top">
                                            <?php the_sub_field('content_block'); ?>
                                        </div>
                                        <!-- /.about-content -->
                                    </div>
                                    <!-- /.col-lg-8 -->
                                    <div class="col-lg-5 image-col">
                                        <div class="about-photo">
                                            <div class="ap-content"></div>
                                            <!-- /.ap-content -->
                                            <img src="<?php the_sub_field('featured_image'); ?>" alt="" class="ap-photo">
                                            <div class="shade"></div>
                                            <!-- /.shade -->
                                        </div>
                                        <!-- /.about-photo -->
                                    </div>
                                    <!-- /.col-lg-4 -->
                                </div>
                                <!-- /.row -->
                            </section>
                            <!-- /.about-item -->

                        <?php endwhile; ?>
                    <?php endif; ?>

                </div>
                <!-- /.about-items -->        
            </div>
            <!-- // container  -->

            <section id="costs-area-about" class="costs-trailer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-intro intro-movers">
                                <h2><?php the_field('section_title_whats_included'); ?></h2>
                                <?php the_field('intro_text_whats_included'); ?>
                            </div>
                            <!-- /.section-intro -->
                        </div>
                        <!-- /.col-md-12 -->
                    </div>
                    <!-- /.row -->
                    <div class="row costs-boxes">
                    <?php if( have_rows('features_blocks_whats_included') ): ?>
                        <?php while( have_rows('features_blocks_whats_included') ): the_row(); ?>

                        <div class="col-lg-6 col-md-6">
                            <div class="cost-box">
                                <img src="<?php the_sub_field('icon'); ?>" alt="">
                                <p><?php the_sub_field('text'); ?></p>
                            </div>
                            <!-- /.cost-box -->
                        </div>
                        <!-- /.col-lg-4 col-md-6 -->

                        <?php endwhile; ?>
                    <?php endif; ?>

                    </div>
                    <!-- /.row costs-boxes -->
                    <div class="row cost-bottom">
                        <div class="col-md-12">
                            <?php the_field('bottom_content_helper_movers'); ?>
                        </div>
                        <!-- /.col-md-12 -->
                    </div>
                    <!-- /.row cost-bottom -->
                </div>
                <!-- /.container -->
            </section>
            <!-- /#costs-area -->         
            
            <section id="city-advantages" style="background-image: url(<?php bloginfo('template_directory'); ?>/img/bg/city-why-bg.jpg);">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2><?php the_field('section_title_city_gen', 'options'); ?></h2>
                        </div>
                        <!-- /.col-md-12 -->
                    </div>
                    <!-- /.row -->
                    <div class="row advantage-items">

                    <?php if( have_rows('reasons_list_city_page', 'options') ): ?>
                        <?php while( have_rows('reasons_list_city_page', 'options') ): the_row(); ?>

                            <div class="col-lg-6">
                                <div class="advantage-box">
                                    <img src="<?php the_sub_field('icon'); ?>" alt="">
                                    <div class="ab-box-in">
                                        <h3><?php the_sub_field('title'); ?></h3>
                                        <p><?php the_sub_field('text'); ?></p>
                                    </div>
                                    <!-- /.ab-box-in -->
                                </div>
                                <!-- /.advantage-box -->
                            </div>
                            <!-- /.col-lg-6 -->

                        <?php endwhile; ?>
                    <?php endif; ?>

                

                    </div>
                    <!-- /.row advantage-items -->
                </div>
                <!-- /.container -->
            </section>
            <!-- /#city-advantages -->     

            <div class="container container-bottom">
                <div class="about-items">

                    <?php if( have_rows('content_blocks_bottom_movers') ): ?>
                        <?php while( have_rows('content_blocks_bottom_movers') ): the_row(); ?>

                            <section class="full-item">
                                <div class="row">
                                    <div class="col-lg-7 content-col">
                                        <div class="about-content about-content--margin-top">
                                            <?php the_sub_field('content_block'); ?>
                                        </div>
                                        <!-- /.about-content -->
                                    </div>
                                    <!-- /.col-lg-8 -->
                                    <div class="col-lg-5 image-col">
                                        <div class="about-photo">
                                            <div class="ap-content"></div>
                                            <!-- /.ap-content -->
                                            <img src="<?php the_sub_field('featured_image'); ?>" alt="" class="ap-photo">
                                            <div class="shade"></div>
                                            <!-- /.shade -->
                                        </div>
                                        <!-- /.about-photo -->
                                    </div>
                                    <!-- /.col-lg-4 -->
                                </div>
                                <!-- /.row -->
                            </section>
                            <!-- /.about-item -->

                        <?php endwhile; ?>
                    <?php endif; ?>

                </div>
                <!-- /.about-items -->       
            </div>       

            <section id="trailer-choose" class="choose-movers" style="background-image: url(<?php the_field('background_image_packing_movers'); ?>);">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-intro">
                                <h2><?php the_field('section_title_packing_movers'); ?></h2>
                            </div>
                            <!-- /.section-intro -->
                            <div class="choose-content">
                                <div class="cc-in">
                                    <?php the_field('content_block_packing_movers'); ?>
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
                             

            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="tm-intro enclosed-tm-intro">
                            <h2><?php the_field('section_title_faq_movers'); ?></h2>
                        </div>
                        <!-- /.tm-intro -->
                        <div class="about-intro">
                            <?php the_field('intro_text_acc_movers'); ?>
                        </div>
                        <!-- // about intro  -->
                    </div>
                    <!-- /.col-md-12 -->
                </div>
                <!-- /.row -->   
            </div>                        

            <div class="blog-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-body-in">
                                    <div id="faq-area" class="blog-accordion movers-faq">
                                        <div class="faq__accordion">
                                            <?php if( have_rows('faq_list_movers') ): ?>
                                                <?php while( have_rows('faq_list_movers') ): the_row(); ?>

                                                    <div class="faq-wrap">
                                                        <h3 class="accordion-heading"><?php the_sub_field('question'); ?></h3>
                                                        <div class="content">
                                                            <?php the_sub_field('answer'); ?>
                                                        </div>
                                                    </div>

                                                <?php endwhile; ?>
                                            <?php endif; ?>
                                        </div>
                                        <!-- /.faq__accordion -->
                                    </div>
                                    <!-- /#faq-area -->
                                </div>
                                <!-- /.blog-body-in -->
                            </div>
                            <!-- /.col-md-12 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </div>
                <!-- /#blog-body -->        

        <div class="about-bottom-shade"></div>
        <div class="about-rb-shape"></div> 
    </div>
    <!-- /#trailer-main -->    

  
    <section id="bottom-quote" class="enclosed-quote service-quote">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="bq-content">
                        <h2><?php the_field('cta_title_bottom_movers'); ?></h2>
                        <?php the_field('intro_block_movers_cta'); ?>
                    </div>
                    <!-- /.bq-content -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6">
                    <div class="quote-form">
                        <div class="quote-form-in">
                            <div class="rib"><?php the_field('form_title_bottom_cta_movers'); ?>
                                <div class="shad"></div>
                            </div>

                             <?php the_field('form_code_cta_bottom_movers'); ?>

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
