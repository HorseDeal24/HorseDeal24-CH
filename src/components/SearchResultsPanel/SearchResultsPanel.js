import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.css';
import { CarouselProvider } from 'pure-react-carousel';
import { Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

const SearchResultsPanel = props => {
  const { 
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    listingsClassName,
    wrappedWithSlider,
    visibleSlides 
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  const listingsClasses = classNames(css[listingsClassName] || css.listingCard); 
    
  const ListingsWrapper = wrappedWithSlider && listings && (listings.length > 3) ? 
  (
    <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={listings.length}
        visibleSlides={visibleSlides}
        infinite={false}
        dragEnabled={false}
        touchEnabled={false}
      >
        <Slider className={css.sliderWrapper}>
          {listings.map( (l, index) => (
            <Slide index={index} key={l.id.uuid}>
              <ListingCard
               className={listingsClasses}
                listing={l}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
              />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className={classNames(css.sliderButton, css.sliderButtonBack)}>Back</ButtonBack>
        <ButtonNext className={classNames(css.sliderButton, css.sliderButtonNext)}>Next</ButtonNext>
      </CarouselProvider>
  )
  :
  (<>
      {
        listings.map( l => (
          <ListingCard
            className={listingsClasses}
            key={l.id.uuid}
            listing={l}
            renderSizes={cardRenderSizes}
            setActiveListing={setActiveListing}
          />
        ))
      }
    </>)

  return (
    <div className={classes}>
      <div className={wrappedWithSlider ? css.sliderListingCards : css.listingCards}>
        {ListingsWrapper}
        {props.children}
      </div>
      {paginationLinks}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
  listingsClassName: null,
  wrappedWithSlider: false
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
  listingsClassName: string,
  wrappedWithSlider: PropTypes.bool
};

export default SearchResultsPanel;
