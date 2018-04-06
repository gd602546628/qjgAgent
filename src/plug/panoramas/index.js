/**
 * Created by gd on 2018/1/4/004.
 */
let three = require('./three')
let dot = require('./doT.min')
let uevent = require('./uevent.min')
import './photo-sphere-viewer.min.css'
import d from 'd.js'
import panoramas from './photo-sphere-viewer'
export default panoramas(three.THREE,d,uevent.uEvent,dot)
