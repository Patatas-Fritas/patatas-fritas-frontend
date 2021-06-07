import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hotspotAction} from "../../../actions/hotspot.action";

function HotspotPage() {
    let X = useRef(0)
    let Y = useRef(0)
    let width = useRef(0)
    let height = useRef(0)
    let drawing = useRef(false)

    let canvas = null;
    let ctx = null;
    let img = null;

    const dispatch = useDispatch()

    useEffect(() => {
        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')

        img = document.getElementById("asd");
        ctx.drawImage(img, 0, 0);

        canvas.addEventListener('mousedown', mouseDown, false)
        canvas.addEventListener('mouseup', mouseUp, false)
        canvas.addEventListener('mousemove', mouseMove, false)

        return () => {
            canvas.removeEventListener('mousedown', () => {})
            canvas.removeEventListener('mouseup', () => {})
            canvas.removeEventListener('mousemove', () => {})
        }

    }, []);

    function mouseDown(e) {
        X = e.pageX - canvas.offsetLeft
        Y = e.pageY - canvas.offsetTop
        drawing = true
    }

    function mouseUp() {
        drawing = false
    }

    function mouseMove(e) {
        if(!drawing) return
        width = (e.pageX - canvas.offsetLeft) - X
        height = (e.pageY - canvas.offsetTop) - Y
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(img, 0, 0);
        ctx.lineWidth = 1.5
        ctx.strokeStyle = 'rgb(0, 255, 255)'
        ctx.strokeRect(X, Y, width, height)
    }

    function saveDrawing() {
        console.log('save me')
        dispatch(hotspotAction.saveHotspot(null, {X, Y, width, height}))
    }

    return (
        <div>
            <img id='asd' width='0' height='0' src="https://i.pinimg.com/originals/e0/3d/5b/e03d5b812b2734826f76960eca5b5541.jpg" alt="cutest panda in the world"/>
            <canvas id="canvas" width="400" height="400"/>
            <br/>
            <button onClick={saveDrawing}>Love me Rectangle</button>
        </div>
    );
}

export default HotspotPage;
