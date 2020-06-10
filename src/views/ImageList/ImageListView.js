import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Pagination, { usePagination } from '@material-ui/lab/Pagination';
import { MemoryRouter as Router } from 'react-router';
import { fetchImages } from '../../api/images-api';
import ImageList from '../ImageList/ImageList/ImageList'
import { ImagesToolbar, ImageCard } from '../ImageList/components';
import { Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));

const ImageListView = props => {
    const classes = useStyles();
    const [imagesData, setImagesData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);


    useEffect(() => {
        getImages(pageNumber - 1);
    }, []);

    const getImages = (page) => {
        var pageNum = pageNumber;
        if (page != -1 && page != undefined) {
            pageNum = page;
        }
        fetchImages(pageNum, _handleImagesSuccess, _handleImagesError, 12);
    };

    const _handleImagesSuccess = data => {
        setImagesData(data.images);
        setTotalPages(data.totalPages);
    };

    const _handleImagesError = error => {
        console.error(error);
    };

    const handlePageChange = page => {
        setPageNumber(page);
        getImages(page - 1);
    };

    return (

        <div className={classes.root}>
            <ImagesToolbar
                getImages={getImages}
                pageNumber={pageNumber} />
            <ImageList
                imagesData={imagesData}
                getImages={getImages}
                totalPages={totalPages}
                pageNumber={pageNumber}
            ></ImageList>
            <div className={classes.pagination}>
                <Router>
                    <Pagination
                        count={totalPages}
                        page={pageNumber}
                        onChange={(event, page) => handlePageChange(page)}
                        renderItem={item => (
                            <PaginationItem
                                component={Link}
                                to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </Router>
            </div>
        </div>

    );
};

export default ImageListView;
