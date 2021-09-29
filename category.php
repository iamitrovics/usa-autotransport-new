<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeFavorite_Starter_Theme
 */

get_header();
?>

<header class="inner-header page-wrapper" style="background-image: url(<?php the_field('background_image_blog_header', get_option('page_for_posts')); ?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-caption">
                    <h1><?php single_cat_title('Category: '); ?></h1>
                    <p><?php the_field('hero_title_blog_header', get_option('page_for_posts')); ?></p>
                </div>
                <!-- /.header-caption -->
            </div>
            <!-- /.col-md-12 -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</header>
<div id="blogs-list">
    <div class="about-items">

        <?php while ( have_posts() ) : the_post(); ?>
                                
                <section class="about-item">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="about-photo">
                                    <a href="<?php echo get_permalink(); ?>">
                                        <div class="ap-content"></div>
                                        <!-- /.ap-content -->
                                        <?php
                                        $imageID = get_field('featured_image_blog');
                                        $image = wp_get_attachment_image_src( $imageID, 'blog-image' );
                                        $alt_text = get_post_meta($imageID , '_wp_attachment_image_alt', true);
                                        ?> 

                                        <img class="img-responsive ap-photo" alt="<?php echo $alt_text; ?>" src="<?php echo $image[0]; ?>" />                                         
                                    </a>
                                    <div class="shade"></div>
                                    <!-- /.shade -->
                                </div>
                                <!-- /.about-photo -->
                            </div>
                            <!-- /.col-lg-4 -->
                            <div class="col-lg-8">
                                <div class="about-content">
                                    <div class="metas">
                                        <span class="date"><?php echo get_the_date( 'F j, Y' ); ?></span> &bull;
                                        <?php
                                        global $post;
                                        $categories = get_the_category($post->ID);
                                        $cat_link = get_category_link($categories[0]->cat_ID);
                                        echo '<a href="'.$cat_link.'">'.$categories[0]->cat_name.'</a>' 
                                        ?>                                        
                                    </div>                                    
                                    <h3><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h3>
                                    <?php the_field('excerpt_text'); ?>
                                    <a href="<?php echo get_permalink(); ?>" class="readmore">Read More</a>
                                    <!-- /.readmore -->
                                </div>
                                <!-- /.about-content -->
                            </div>
                            <!-- /.col-lg-8 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container -->
                </section>
                <!-- /.about-item -->                            
            
            <?php endwhile; ?>

            <div class="container">
                <nav class="pagination-block">
                    <?php if( function_exists('wp_pagenavi') ) wp_pagenavi(); // WP-PageNavi function ?>
                </nav>    
            </div>


    </div>
    <!-- /.about-items -->

    <div class="blog-categories">
        <div class="bc-in">
            <span class="bc-title">Categories</span>
            <ul>
                <?php wp_list_categories( array(
                      'orderby'    => 'name',
                      'show_count' => false,
                      'title_li' => '',
                  ) ); ?> 
              </ul>    
        </div>
        <!-- /.bc-in -->
    </div>
    <!-- /.blog-categories -->
    <div class="about-bottom-shade"></div>
    <div class="about-rb-shape"></div> 


    <div class="trailer-why" style="background-image: url(<?php the_field('background_image_why_Cta_blog', get_option('page_for_posts')); ?>);">
        <div class="row">
            <div class="col-md-12">
                <div class="tw-content">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="tw-intro">
                                <h2><?php the_field('cta_title_blog_page_cta_why', get_option('page_for_posts')); ?></h2>
                            </div>
                            <!-- /.tw-intro -->
                        </div>
                        <!-- /.col-lg-6 -->
                        <div class="col-lg-6">
                            <div class="tw-text">
                                <?php the_field('cta_content_why_cta_blog', get_option('page_for_posts')); ?>
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

</div>
<!-- /#blogs-list -->

<?php
get_footer();
