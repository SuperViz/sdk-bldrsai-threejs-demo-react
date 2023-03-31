import SuperVizSdk from '@superviz/sdk'
import {ThreeJsPlugin} from '@superviz/threejs-plugin'

// import * as process from 'node:process'

// eslint-disable-next-line no-magic-numbers
export const userId = Date.now().toPrecision(20)
export const SDK_SYNC_PLANE_SELECTED = 'sdkSyncPlaneSelected'
export const SDK_SYNC_CUT_PLANES = 'sdkSyncCutPlanes'
export const SDK_SYNC_DESELECT_ITEMS = 'sdkSyncDeselectItems'
export let superviz = null

const totalAvatars = 9

// const DEVELOPER_KEY = process.env.SUPERVIZ_DEVELOPER_TOKEN
const DEVELOPER_KEY = 'ypxgtea8rr2edxrnr1200ji117oc59'
const nameUser = 'nome'
const typeUser = 'host'
const customAvatars = []

for (let i = 1; i <= totalAvatars; i++) {
  customAvatars.push({
    model: `https://production.storage.superviz.com/readyplayerme/${i}.glb`,
    thumbnail: `https://production.cdn.superviz.com/static/default-avatars/${i}.png`,
  })
}

/**
 * initialize superviz SDK
 */
export async function initializeSupervizSDK() {
  superviz = await SuperVizSdk.init(DEVELOPER_KEY, {
    group: {
      id: '<GROUP-ID>',
      name: '<GROUP-NAME>',
    },
    participant: {
      id: userId,
      name: nameUser,
      type: typeUser,
    },
    roomId: 'vinicius',
    defaultAvatars: true,
    avatars: customAvatars,
    enableFollow: true,
    enableGoTo: true,
    enableGather: true,
    debug: false,
    environment: 'dev',
  })
}

/**
 *  load Plugin Superviz SDK
 */
export async function loadPluginSupervizSDK(viewer) {
  const scene = viewer.context.scene.scene
  const camera = viewer.context.ifcCamera.perspectiveCamera
  const player = camera
  const plugin = new ThreeJsPlugin(scene, camera, player)

  await superviz.subscribe(window.SuperVizSdk.MeetingEvent.MY_PARTICIPANT_JOINED, () => {
    superviz.loadPlugin(plugin, {
      avatarConfig: {
        height: 0,
        scale: 10,
        laserOrigin: {x: 0, y: 0, z: 0},
      },
      isAvatarsEnabled: true,
      isLaserEnabled: true,
      isMouseEnabled: true,
      isNameEnabled: true,
      renderLocalAvatar: true,
    })
  })

  await superviz.subscribe(window.SuperVizSdk.MeetingEvent.MEETING_LEAVE, function() {
    superviz.unloadPlugin()
    superviz.destroy()
  })
  await superviz.subscribe(window.SuperVizSdk.MeetingEvent.MY_PARTICIPANT_LEFT, function() {
    superviz.unloadPlugin()
  })
  await superviz.subscribe(window.SuperVizSdk.MeetingEvent.DESTROY, function() {
    superviz.unloadPlugin()
    superviz = null
  })
}

/**
 *  Sync Scene
 */
export const syncSdkScene = (content) => {
  superviz.setSyncProperty(SDK_SYNC_PLANE_SELECTED, content)
}

/**
 *  Sync Plane
 */
export const syncSdkPlane = (content) => {
  superviz.setSyncProperty(SDK_SYNC_CUT_PLANES, content)
}

/**
 *  Sync Delete Planes
 */
export const syncSdkDeselectItems = () => {
  superviz.setSyncProperty(SDK_SYNC_DESELECT_ITEMS, 'deselectItems')
}
