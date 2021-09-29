<?php get_header(); ?>

    <header id="inner-header">
        <div class="container">
            <h1><?php single_cat_title('Categorie de Projet: '); ?></h1>
        </div>
    </header>
    <!-- // inner header  -->

    <section class="archive-listing">
        <div class="container">

            <div class="archive-wrapper">
            <?php while ( have_posts() ) : the_post(); ?>
                <div class="archive-card">
                    <a href="<?php echo get_permalink(); ?>">
                        <?php
                        $imageID = get_field('cover_image_project');
                        $image = wp_get_attachment_image_src( $imageID, 'cat-image' );
                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                        ?> 

                        <img class="img-responsive" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" /> 
                        <div class="overlay">
                        </div>
                    </a>
                    <h2><?php the_title() ;?></h2>
                </div>
                <!-- // card  -->
            <?php endwhile; // end of the loop. ?> 
            </div>
            <!-- // wrapper  -->

        </div>
        <!-- // container  -->
    </section>
    <!-- // archive  -->

    <?php include(TEMPLATEPATH . '/inc/inc-contact.php'); ?>

<?php get_footer(''); ?>