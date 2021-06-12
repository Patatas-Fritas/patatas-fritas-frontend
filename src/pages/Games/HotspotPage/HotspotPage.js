import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DropzoneDialogBase} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

import {hotspotAction} from "../../../actions/hotspot.action";

function HotspotPage() {
    let X = useRef(0)
    let Y = useRef(0)
    let width = useRef(0)
    let height = useRef(0)
    let drawing = useRef(false)

    const [imageState, setImageState] = useState(null)
    const imageStateRef = useRef(imageState)
    const [error, setError] = useState(null)

    const setImage = imgSrc => {
        imageStateRef.current = imgSrc
        setImageState(imgSrc)
    }

    let image = useRef(null)
    const [open, setOpen] = useState(false)
    const [fileObjects, setFileObjects] = useState([])

    const canvasRef = React.useRef(null)
    let ctxRef = useRef(null);

    const [canvasSize, setCanvasSize] = useState({width: 0, height: 0})

    const dispatch = useDispatch()

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d')

        if(imageStateRef.current){
            ctxRef.current.drawImage(imageStateRef.current, 0, 0);
        }

        canvasRef.current.addEventListener('mousedown', mouseDown, false)
        canvasRef.current.addEventListener('mouseup', mouseUp, false)
        canvasRef.current.addEventListener('mousemove', mouseMove, false)

        return () => {
            // canvasRef.current.removeEventListener('mousedown', () => {})
            // canvasRef.current.removeEventListener('mouseup', () => {})
            // canvasRef.current.removeEventListener('mousemove', () => {})
        }

    }, [canvasSize]);

    function mouseDown(e) {
        X = e.pageX - canvasRef.current.offsetLeft
        Y = e.pageY - canvasRef.current.offsetTop
        drawing = true
    }

    function mouseUp() {
        drawing = false
    }

    function mouseMove(e) {
        if(!drawing || !imageStateRef.current) return
        width = (e.pageX - canvasRef.current.offsetLeft) - X
        height = (e.pageY - canvasRef.current.offsetTop) - Y
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        ctxRef.current.drawImage(imageStateRef.current, 0, 0);
        ctxRef.current.lineWidth = 1.5
        ctxRef.current.fillStyle = 'rgba(181, 211, 231, 0.4)'
        ctxRef.current.fillRect(X, Y, width, height)
        ctxRef.current.strokeStyle = 'rgb(181, 211, 231)'
        ctxRef.current.strokeRect(X, Y, width, height)
    }

    function saveDrawing() {
        // console.log(X.current)
        // if (X === 0 || Y === 0 || width === 0 || height === 0) {
        //     return setError('A koordináták kijelölése kötelező!')
        // }
        dispatch(hotspotAction.saveHotspot(imageStateRef.current.src, {X, Y, width, height}))
        setError(null)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSave(files) {
        setOpen(false)
        setCanvasSize({width: imageStateRef.current.width, height: imageStateRef.current.height})
    }

    function handleOpen() {
        setOpen(true)
        setError(null)
    }

    return (
        <div>
            {error &&
            <Alert variant="filled" severity="warning">{error}</Alert>
            }
            <canvas style={{border: '1px solid black'}} id="canvas" width={canvasSize.width} height={canvasSize.height} ref={canvasRef}/>
            <br/>
            {/*ToDo a feltoltes gomb disabled amig nincs kep*/}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Kép Feltöltes
            </Button>
            <br/>
            <Button variant='contained' color='secondary' disabled={!imageState} onClick={saveDrawing}>Feladat Mentése</Button>
            <DropzoneDialogBase
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                filesLimit={1}
                onClose={handleClose}
                submitButtonText='Feltöltes'
                cancelButtonText='Mégsem'
                previewText='Előnézet'
                dropzoneText='Húzd ide a képet!'
                fileObjects={fileObjects}
                onAdd={newFileObjs => {
                    console.log('onAdd', newFileObjs);
                    let img = new Image()
                    img.src = newFileObjs[0].data
                    setImage(img)
                    setFileObjects([].concat(fileObjects, newFileObjs));
                }}
            />
        </div>
    );
}

export default HotspotPage;
