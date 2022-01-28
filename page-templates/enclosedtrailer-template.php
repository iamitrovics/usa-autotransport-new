<?php
/**
 * Template Name: Enclosed Autotransport Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_enclosed_hero'); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-caption">
                    <h1><?php the_field('hero_title_enclosed_hero'); ?></h1>
                    <p><?php the_field('hero_subtitle_enclosed_hero'); ?></p>
                </div>
                <!-- /.header-caption -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</header>
<section id="about-intro-area" class="enclosed-intro-area">
    <div class="intro-topleft-shape"></div>    
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <img src="<?php bloginfo('template_directory'); ?>/img/ico/stars.png" alt="" class="stars">
                <div class="about-intro-content">
                    <?php the_field('intro_text_enclosed_page'); ?>
                </div>
                <!-- /.about-intro-content -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
    <div class="scroll-down"><a href="#trailer-main"><i class="icon-angle-right"></i></a></div>
    <!-- /.scroll-down -->
</section>
<!-- /#about-intro-area -->

<div id="trailer-main">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="tm-intro enclosed-tm-intro">
                    <h2><?php the_field('section_title_enclosed_main'); ?></h2>
                </div>
                <!-- /.tm-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="about-items">

            <?php if( have_rows('about_blocks_main_enclosed') ): ?>
                <?php while( have_rows('about_blocks_main_enclosed') ): the_row(); ?>

                    <section class="about-item">
                        <div class="row">
                            <div class="col-md-7 col-lg-8">
                                <div class="about-content">
                                    <?php the_sub_field('content_block'); ?>
                                </div>
                                <!-- /.about-content -->
                            </div>
                            <!-- /.col-lg-8 -->
                            <div class="col-md-5 col-lg-4">
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

        <div class="trailer-why">
            <div class="row">
                <div class="col-md-12">
                    <div class="tw-content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="tw-intro">
                                    <h2><?php the_field('block_title_why_enclosed_page'); ?></h2>
                                </div>
                                <!-- /.tw-intro -->
                            </div>
                            <!-- /.col-lg-6 -->
                            <div class="col-lg-6">
                                <div class="tw-text">
                                    <?php the_field('content_block_why_encls'); ?>
                                </div>
                                <!-- /.tw-text -->
                            </div>
                            <!-- /.col-lg-6 -->
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
        <div class="trailer-difference">

            <div class="row">
                <div class="col-md-12">
                    <div class="td-intro">
                        <h2><?php the_field('section_title_diff_enclosed'); ?></h2>
                    </div>
                    <!-- /.td-intro -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->

            <div class="row">
                <div class="col-md-3">
                    <div class="td-photo">
                        <div class="ap-content"></div>
                        <!-- /.ap-content -->
                        <img src="<?php the_field('featured_image_1_diff'); ?>" alt="" class="ap-photo">
                        <div class="shade"></div>
                        <!-- /.shade -->
                    </div>
                </div>
                <!-- /.col-md-3 -->
                <div class="col-md-6">
                    <div class="td-content">
                        <?php the_field('content_block_diff_enclosed'); ?>
                    </div>
                    <!-- /.td-content -->
                </div>
                <!-- /.col-md-6 -->
                <div class="col-md-3">
                    <div class="td-photo">
                        <div class="ap-content"></div>
                        <!-- /.ap-content -->
                        <img src="<?php the_field('featured_image_2_diff'); ?>" alt="" class="ap-photo">
                        <div class="shade"></div>
                        <!-- /.shade -->
                    </div>
                </div>
                <!-- /.col-md-3 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.trailer-difference -->
    </div>
    <!-- /.container -->
    <div class="about-bottom-shade"></div>
    <div class="about-rb-shape"></div> 
</div>
<!-- /#trailer-main -->

<section id="trailer-advantages" style="background-image: url(<?php the_field('background_image_adv_enclosed'); ?>);">
    <div class="container">
        <div class="row ta-intro">
            <div class="col-md-4">
                <h2><?php the_field('block_title_adv_enclosed'); ?></h2>
            </div>
            <!-- /.col-md-4 -->
            <div class="col-md-8">
                <div class="ta-intro-content">
                    <?php the_field('intro_text_adv_enclosed'); ?>
                </div>
                <!-- /.ta-intro-content -->
            </div>
            <!-- /.col-md-8 -->
        </div>
        <!-- /.row -->
        <div class="row advantage-items">
            <?php if( have_rows('advantages_blocks_enclosed') ): ?>
            <?php while( have_rows('advantages_blocks_enclosed') ): the_row(); ?>

                <div class="col-md-6">
                    <div class="advantage-box">
                        <div class="ab-box-in">
                            <div class="ab-heading">
                                <h3><img src="<?php the_sub_field('icon'); ?>" alt=""> <?php the_sub_field('title'); ?></h3>
                            </div>
                            <!-- /.ab-heading -->
                           <p><?php the_sub_field('text'); ?></p>
                        </div>
                        <!-- /.ab-box-in -->
                    </div>
                    <!-- /.advantage-box -->
                </div>
                <!-- /.col-md-6 -->

            <?php endwhile; ?>
            <?php endif; ?>

        </div>
        <!-- /.row advantage-items -->
    </div>
    <!-- /.container -->
</section>
<!-- /#trailer-advantages -->

<section id="costs-enclosed">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_cost_enclosed'); ?></h2>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-6">
                <div class="cost-photo">
                    <div class="ap-content"></div>
                    <!-- /.ap-content -->
                    <img src="<?php the_field('featured_image_cst_enclosed'); ?>" alt="" class="ap-photo">
                    <div class="shade"></div>
                </div>
                <!-- /.cost-photo -->
            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6">
                <div class="cost-content">
                    <?php the_field('content_block_cost_enclosed'); ?>
                </div>
                <!-- /.cost-content -->
            </div>
            <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
<!-- /#costs-enclosed -->

<section id="enclosed-middle" style="background-image: url(<?php the_field('background_image_forming'); ?>)">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2><?php the_field('section_title_enclosed_forming'); ?></h2>
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <?php if( have_rows('pricing_blocks_forming') ): ?>
                <?php while( have_rows('pricing_blocks_forming') ): the_row(); ?>

                    <div class="col-md-4">
                        <div class="tm-box">
                            <img src="<?php the_sub_field('icon'); ?>" alt="">
                            <h3><?php the_sub_field('title'); ?></h3>
                            <p><?php the_sub_field('text'); ?></p> 
                        </div>
                        <!-- /.tm-box -->
                    </div>
                    <!-- /.col-md-4 -->

                <?php endwhile; ?>
            <?php endif; ?>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
<!-- /#enclosed-middle -->

<section id="offer-enclosed">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_delivery_enclosed'); ?></h2>
                </div>
                <!-- /.section-intro -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
        <div class="row">
            <div class="col-md-6">
                <div class="cost-content">
                    <?php the_field('contnt_block_del_enclosed_get'); ?>

                </div>
                <!-- /.cost-content -->
            </div>
            <!-- /.col-md-6 -->
            <div class="col-md-6">
                <div class="cost-photo">
                    <div class="ap-content"></div>
                    <!-- /.ap-content -->
                    <img src="<?php the_field('featured_image_del_offer'); ?>" alt="" class="ap-photo">
                    <div class="shade"></div>
                    <div class="ap-cta">
                        <a href="<?php the_field('button_link_del_enclosed_cta'); ?>"><?php the_field('button_label_del_cta_enclosed'); ?></a>
                    </div>
                </div>
                <!-- /.cost-photo -->
            </div>
            <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
<!-- /#offer-enclosed -->
<section id="prepare-area" class="enclosed-prepare">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-intro">
                    <h2><?php the_field('section_title_dev_door'); ?></h2>
                    <?php the_field('intro_text_door_to_door'); ?>
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
                    <?php if( have_rows('features_list_door') ): ?>
                        <?php while( have_rows('features_list_door') ): the_row(); ?>

                            <div class="col-md-6">
                                <div class="prepare-item">
                                    <p><?php the_sub_field('value'); ?></p>
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

<div id="enclosed-ctas">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="ec-in" style="background-image: url(<?php the_field('background_image_cta_enclosed'); ?>)">
                    <div class="row">

                        <?php if( have_rows('cta_blocks_enclosed') ): ?>
                        <?php while( have_rows('cta_blocks_enclosed') ): the_row(); ?>

                            <div class="col-lg-6">
                                <div class="about-photo">
                                    <div class="ap-content">
                                        <div class="ap-text">
                                            <h2><?php the_sub_field('block_title'); ?></h2>
                                            <?php the_sub_field('content_block'); ?>
                                        </div>
                                        <!-- /.ap-text -->
                                    </div>
                                    <!-- /.ap-content -->
                                </div>
                                <!-- /.about-photo -->
                            </div>
                            <!-- /.col-lg-6 -->

                        <?php endwhile; ?>
                        <?php endif; ?>

                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.ec-in -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</div>
<!-- /#enclosed-ctas -->
<section id="bottom-quote" class="enclosed-quote">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="bq-content">
                    <h2><?php the_field('cta_title_form_enclosed'); ?></h2>
                    <?php the_field('cta_text_forming_blocks'); ?>
                </div>
                <!-- /.bq-content -->
            </div>
            <!-- /.col-lg-6 -->
            <div class="col-lg-6">
                <div class="quote-form">
                    <div class="quote-form-in">
                        <div class="rib"><?php the_field('form_title_enclosed_bottom_cta'); ?>
                            <div class="shad"></div>
                        </div>
                        <?php the_field('form_code_enclosed_botto_cta'); ?>
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
