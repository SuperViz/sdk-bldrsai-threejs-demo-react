import SuperVizSdk, {MeetingEvent} from '@superviz/sdk'
import {ThreeJsPlugin} from '@superviz/threejs-plugin'
import useStore from '../../../../src/store/useStore'

// eslint-disable-next-line no-magic-numbers
export const userId = Date.now().toPrecision(20)
export const SDK_SYNC_PLANE_SELECTED = 'sdkSyncPlaneSelected'
export const SDK_SYNC_CUT_PLANES = 'sdkSyncCutPlanes'
export const SDK_SYNC_DESELECT_ITEMS = 'sdkSyncDeselectItems'
export let superviz = null
export const CONTENT_SYNC_CHANGE_MODEL = 'changeModel'

// TODO: Remove superviz sdk to ENV
const DEVELOPER_KEY = '<SUPERVIZ_API_KEY>'

/**
 * initialize superviz SDK
 */
export async function initializeSupervizSDK() {
  const meetingStats = useStore.getState().meetingStats
  superviz = await SuperVizSdk.init(DEVELOPER_KEY, {
    group: {
      id: '<GROUP-ID>',
      name: '<GROUP-NAME>',
    },
    participant: {
      id: userId,
      name: meetingStats.userName,
      type: meetingStats.userType,
    },
    roomId: meetingStats.roomId,
    defaultAvatars: true,
    enableFollow: true,
    enableGoTo: true,
    enableGather: true,
    environment: 'dev',
  })
}

/**
 *  load Plugin Superviz SDK
 */
export async function loadPluginSupervizSDK(viewer, load = null) {
  const scene = viewer.context.scene.scene
  const camera = viewer.context.ifcCamera.perspectiveCamera
  const player = camera
  const plugin = new ThreeJsPlugin(scene, camera, player)

  const loadPlugin = () => {
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
  }
  if (load) {
    loadPlugin()
  }

  await superviz.subscribe(MeetingEvent.MY_PARTICIPANT_JOINED, () => {
    loadPlugin()
  })

  await superviz.subscribe(MeetingEvent.MEETING_LEAVE, function() {
    superviz.unloadPlugin()
  })
  await superviz.subscribe(MeetingEvent.MY_PARTICIPANT_LEFT, function() {
    superviz.unloadPlugin()
  })
  await superviz.subscribe(MeetingEvent.DESTROY, function() {
    superviz.unloadPlugin()
    unsubscribeAllEvents()
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
 *  Sync Deselect Planes
 */
export const syncSdkDeselectItems = () => {
  superviz.setSyncProperty(SDK_SYNC_DESELECT_ITEMS, 'deselectItems')
}

/**
 *  Sync on Content Changed
 */
export const onContentChanged = (viewer) => {
  superviz.unloadPlugin()
  const loadModel = true
  loadPluginSupervizSDK(viewer, loadModel)
}

/**
 *  Sync Content
 */
export const syncContent = (newModelSid) => {
  superviz.setSyncProperty(CONTENT_SYNC_CHANGE_MODEL, newModelSid)
}

/**
 * unsubiscribe all when destroyed
 */
function unsubscribeAllEvents() {
  superviz.unsubscribe(SDK_SYNC_CUT_PLANES)
  superviz.unsubscribe(SDK_SYNC_PLANE_SELECTED)
  superviz.unsubscribe(SDK_SYNC_DESELECT_ITEMS)
  superviz.unsubscribe(CONTENT_SYNC_CHANGE_MODEL)
  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_JOINED)
  superviz.unsubscribe(MeetingEvent.MEETING_LEAVE)
  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_LEFT)
  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_UPDATED)
  superviz.unsubscribe(MeetingEvent.MEETING_HOST_CHANGE)
  superviz.unsubscribe(MeetingEvent.DESTROY)
}
