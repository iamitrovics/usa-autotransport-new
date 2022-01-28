<?php
/**
 * Template Name: FAQ Template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

    <header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_faq_header'); ?>);">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-caption">
                        <h1><?php the_field('custom_title_faq_header'); ?></h1>
                    </div>
                    <!-- /.header-caption -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </header>
    <section id="faq-intro-area">
        <div class="intro-topleft-shape"></div>    
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <img src="<?php bloginfo('template_directory'); ?>/img/ico/stars.png" alt="" class="stars">
                    <div class="about-intro-content">
                        <div class="faq-text">
                            <?php the_field('intro_text_faq_content'); ?>
                        </div>
                        <!-- /.faq-text -->
                        <div class="faq-photo">
                            <img src="<?php the_field('featured_imag_faq'); ?>" alt="">
                        </div>
                        <!-- /.faq-photo -->
                    </div>
                    <!-- /.about-intro-content -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="scroll-down"><a href="#faq-section"><i class="icon-angle-right"></i></a></div>
        <!-- /.scroll-down -->
    </section>
    <div id="faq-section">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="faq__accordion">

                        <?php if( have_rows('faq_list_faq') ): ?>
                            <?php $counter = 0; ?>
                            <?php while( have_rows('faq_list_faq') ): the_row(); $counter++; ?>

                                <div class="faq-wrap">
                                    <h3 class="accordion-heading <?=($counter == 1) ? 'active' : ''?>"><?php the_sub_field('question'); ?></h3>
                                    <div class="content"  style="display:<?=($counter == 1) ? 'block' : ''?>">
                                        <?php the_sub_field('answer'); ?>
                                    </div>
                                </div>

                            <?php endwhile; ?>
                        <?php endif; ?>

                    </div>
                    <!-- /.faq__accordion -->
                </div>
                <!-- /.col-md-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
        <div class="about-bottom-shade"></div>
    </div>
    <!-- /#faq-section -->

<?php get_footer(); ?>
