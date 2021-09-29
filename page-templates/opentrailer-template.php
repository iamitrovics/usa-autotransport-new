<?php
/**
 * Template Name: Open Autotransport Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_hero_open'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('main_title_open_trailer_hero'); ?></h1>
                        <p><?php the_field('main_subtitle_hero_open'); ?></p>
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
                        <?php the_field('intro_text_open_trailer'); ?>
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
                <div class="col-md-12">
                    <div class="tm-intro">
                        <h2><?php the_field('section_title_about_open'); ?></h2>
                    </div>
                    <!-- /.tm-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="about-items">

                <?php if( have_rows('about_blocks_open_trailer') ): ?>
                    <?php while( have_rows('about_blocks_open_trailer') ): the_row(); ?>

                        <section class="about-item">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="about-content">
                                        <?php the_sub_field('content_block'); ?>
                                    </div>
                                    <!-- /.about-content -->
                                </div>
                                <!-- /.col-lg-8 -->
                                <div class="col-lg-4">
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
            <div class="trailer-why"  style="background-image: url(<?php the_field('background_image_why_open'); ?>);">
                <div class="row">
                    <div class="col-md-12">
                        <div class="tw-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="tw-intro">
                                        <h2><?php the_field('block_title_why_open_trailer'); ?></h2>
                                    </div>
                                    <!-- /.tw-intro -->
                                </div>
                                <!-- /.col-md-6 -->
                                <div class="col-md-6">
                                    <div class="tw-text">
                                        <?php the_field('content_block_why_open_trailer'); ?>
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
            <div class="trailer-ctas">
                <div class="row">

                    <div class="col-lg-6">
                        <div class="tc-intro">
                            <h2><?php the_field('section_title_delivery_open'); ?></h2>
                            <?php the_field('intro_text_open_delivery'); ?>
                        </div>
                        <!-- /.tc-intro -->
                    </div>
                    <!-- /.col-lg-6 -->

                    <div class="col-lg-6">

                    <?php if( have_rows('delivery_blocks_open') ): ?>
                        <?php while( have_rows('delivery_blocks_open') ): the_row(); ?>

                            <div class="about-photo" style="background-image: url(<?php the_sub_field('background_image'); ?>)">
                                <div class="ap-content">
                                    <div class="ap-text">
                                        <?php the_sub_field('content_block'); ?>
                                    </div>
                                    <!-- /.ap-text -->
                                </div>
                                <!-- /.ap-content -->
                            </div>
                            <!-- /.about-photo -->

                        <?php endwhile; ?>
                    <?php endif; ?>

                    </div>
                    <!-- /.col-lg-6 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.trailer-ctas -->
        </div>
        <!-- /.container -->
        <div class="about-bottom-shade"></div>
        <div class="about-rb-shape"></div> 
    </div>
    <!-- /#trailer-main -->
    <section id="trailer-choose" style="background-image: url(<?php the_field('background_image_choose_open'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_choose_open'); ?></h2>
                    </div>
                    <!-- /.section-intro -->
                    <div class="choose-content">
                        <div class="cc-in">
                            <?php the_field('content_block_choose_open'); ?>
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

    <section id="costs-area-about" class="costs-trailer">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_cost_trailer'); ?></h2>
                        <?php the_field('intro_text_cost_open'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row costs-boxes">
            <?php if( have_rows('cost_blocks_open') ): ?>
                <?php while( have_rows('cost_blocks_open') ): the_row(); ?>

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
                    <div class="cost-box" style="background-image: url(<?php the_field('background_image_cost_cta'); ?>)">
                        <div class="cb-content">
                            <h3><?php the_field('cta_title_cost_cta'); ?></h3>
                            <a href="<?php the_field('cta_link_cta_label_cost'); ?>" class="costs-btn"><?php the_field('button_label_cost_cta'); ?></a>
                        </div>
                        <!-- /.cb-content -->
                    </div>
                    <!-- /.cost-box -->
                </div>
                <!-- /.col-lg-4 col-md-6 -->
            </div>
            <!-- /.row costs-boxes -->
            <div class="row cost-bottom">
                <div class="col-md-12">
                    <?php the_field('bottom_content_cost_bottom'); ?>
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row cost-bottom -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#costs-area -->

    <section id="trailer-middle" style="background-image: url(<?php the_field('background_image_questin_trailer'); ?>)">
        <div class="container">
            <div class="row">

                <?php if( have_rows('questions_list_question_open') ): ?>
                    <?php while( have_rows('questions_list_question_open') ): the_row(); ?>

                        <div class="col-md-6">
                            <div class="tm-box">
                                <h2><?php the_sub_field('question'); ?></h2>
                                <img src="<?php the_sub_field('icon'); ?>" alt="">
                                <?php the_sub_field('answer'); ?>
                            </div>
                            <!-- /.tm-box -->
                        </div>
                        <!-- /.col-md-6 -->

                    <?php endwhile; ?>
                <?php endif; ?>

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#trailer-middle -->
    <section id="prepare-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-intro">
                        <h2><?php the_field('section_title_features_open'); ?></h2>
                        <?php the_field('intro_text_feat_open'); ?>
                    </div>
                    <!-- /.section-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-12">
                    <div class="prepare-items">
                        <div class="row">

                            <?php if( have_rows('features_list_open_trailer') ): ?>
                                <?php while( have_rows('features_list_open_trailer') ): the_row(); ?>

                                    <div class="col-md-6">
                                        <div class="prepare-item">
                                            <?php the_sub_field('text'); ?>
                                        </div>
                                        <!-- /.prepare-item -->
                                    </div>
                                    <!-- /.col-md-6 -->

                                <?php endwhile; ?>
                            <?php endif; ?>

                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.prepare-items -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>
    <!-- /#prepare-area -->
    <section id="bottom-quote" class="trailer-quote">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="bq-content">
                        <h2><?php the_field('block_title_quote_cta_open'); ?></h2>
                        <?php the_field('intro_text_cta_open_trailer'); ?>
                    </div>
                    <!-- /.bq-content -->
                </div>
                <!-- /.col-lg-6 -->
                <div class="col-lg-6">
                    <div class="quote-form">
                        <div class="quote-form-in">
                            <div class="rib"><?php the_field('form_title_quote_open_trailer'); ?>
                                <div class="shad"></div>
                            </div>
                            <?php the_field('form_code_trailer_bottom_open'); ?>
                            <form action="">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="">Name</label>
                                            <input type="text" placeholder="Full Name">
                                        </div>
                                        <!-- /.form-group -->
                                    </div>
                                    <!-- /.col-md-12 -->
                                </div>
                                <!-- /.row -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="">Phone</label>
                                            <input type="tel" placeholder="_-___-__-__">
                                        </div>
                                        <!-- /.form-group -->
                                    </div>
                                    <!-- /.col-md-12 -->
                                </div>
                                <!-- /.row -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="">E-mail</label>
                                            <input type="email" placeholder="someone@gmail.com">
                                        </div>
                                        <!-- /.form-group -->
                                    </div>
                                    <!-- /.col-md-12 -->
                                    
                                </div>
                                <!-- /.row -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group date-area">
                                            <label for="">Move Date</label>
                                            <input type="text" placeholder="yyy-mm-dd" class="date-picker-input">
                                            <i class="icon-calendar-alt"></i>
                                        </div>
                                        <!-- /.form-group -->
                                    </div>
                                    <!-- /.col-md-12 -->
                                </div>
                                <!-- /.row -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <button type="submit">Get Started Today</button>
                                    </div>
                                    <!-- /.col-md-12 -->
                                </div>
                                <!-- /.row -->
                            </form>
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
