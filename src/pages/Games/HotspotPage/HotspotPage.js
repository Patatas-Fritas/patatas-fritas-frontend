import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DropzoneDialogBase} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {hotspotAction} from "../../../actions/hotspot.action";

function HotspotPage() {
    let X = useRef(0)
    let Y = useRef(0)
    let width = useRef(0)
    let height = useRef(0)
    let drawing = useRef(false)

    const [imageState, setImageState] = useState(null)
    const imageStateRef = useRef(imageState)

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
            canvasRef.current.removeEventListener('mousedown', () => {})
            canvasRef.current.removeEventListener('mouseup', () => {})
            canvasRef.current.removeEventListener('mousemove', () => {})
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
        dispatch(hotspotAction.saveHotspot(imageStateRef.current.src, {X, Y, width, height}))
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
    }

    return (
        <div>
            <canvas style={{border: '1px solid black'}} id="canvas" width={canvasSize.width} height={canvasSize.height} ref={canvasRef}/>
            <br/>
            {/*ToDo a feltoltes gomb disabled amig nincs kep*/}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Kep Feltoltes
            </Button>
            <br/>
            <Button variant='contained' color='secondary' onClick={saveDrawing}>Feladat Mentese</Button>
            <DropzoneDialogBase
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                filesLimit={1}
                onClose={handleClose}
                submitButtonText='Feltoltes'
                cancelButtonText='Bezaras'
                previewText='Elonezet'
                dropzoneText='Huzd ide a kepeket teso'
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
