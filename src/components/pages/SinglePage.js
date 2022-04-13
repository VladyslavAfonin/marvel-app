import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner"

const SinglePage = ({Component, DataType}) => {
    const {dataId} = useParams();
    const [data, setData] = useState(null);

    const {error, loading, clearError, getCharacter, getComics} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [dataId])

    const updateChar = () => {
        clearError();

        if(DataType === "comic") {
            getComics(dataId).then(onDataLoaded);
        } else if (DataType === "character") {
            getCharacter(dataId).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;