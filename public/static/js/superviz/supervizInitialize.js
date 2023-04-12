import SuperVizSdk, {MeetingEvent, RealtimeEvent} from '@superviz/sdk'
import {ThreeJsPlugin} from '@superviz/threejs-plugin'
import useStore from '../../../../src/store/useStore'
import {isHost} from '../../../../src/Containers/CadView'

// eslint-disable-next-line no-magic-numbers
export const myParticipantId = Date.now().toPrecision(20)
export const SDK_SYNC_PLANE_SELECTED = 'sdkSyncPlaneSelected'
export const SDK_SYNC_CUT_PLANES = 'sdkSyncCutPlanes'
export const SDK_SYNC_DESELECT_ITEMS = 'sdkSyncDeselectItems'
export let superviz = null
export const CONTENT_SYNC_CHANGE_MODEL = 'changeModel'
export const CONTENT_SYNC_CAMERA_POSITION = 'cameraPosition'

// TODO: Remove superviz sdk to ENV
const DEVELOPER_KEY = 'ypxgtea8rr2edxrnr1200ji117oc59'
let cameraControls = ''

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
      id: myParticipantId,
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
  const scene = viewer.IFC.context.scene.scene
  const camera = viewer.IFC.context.ifcCamera.perspectiveCamera
  const player = camera

  cameraControls = viewer.IFC.context.ifcCamera.cameraControls
  const plugin = new ThreeJsPlugin(scene, camera, player)

  let supervizPlugin = null
  const loadPlugin = () => {
    supervizPlugin = superviz.loadPlugin(plugin, {
      avatarConfig: {
        height: 0,
        scale: 10,
        laserOrigin: {x: 0, y: 0, z: 0},
      },
      isAvatarsEnabled: true,
      isLaserEnabled: false,
      isMouseEnabled: true,
      isNameEnabled: false,
      renderLocalAvatar: false,
    })
  }

  if (load) {
    loadPlugin()
  }

  await superviz.subscribe(MeetingEvent.MY_PARTICIPANT_JOINED, () => {
    loadPlugin()
  })

  await superviz.subscribe(RealtimeEvent.REALTIME_FOLLOW_PARTICIPANT, (followParticipantId) => {
    cameraControls.enabled = ((followParticipantId === undefined || followParticipantId === myParticipantId))
  })

  await superviz.subscribe(RealtimeEvent.REALTIME_GATHER, () => {
    cameraControls.enabled = false
    if (isHost) {
      const payload = {
        position: cameraControls.camera.position,
      }
      syncCameraPosition(payload)
    }
  })

  await superviz.subscribe(CONTENT_SYNC_CAMERA_POSITION, function(cameraPosition) {
    if (!isHost) {
      cameraControls.setPosition(cameraPosition.position.x, cameraPosition.position.y, cameraPosition.position.z)
    }
    cameraControls.enabled = true
  })

  await superviz.subscribe(RealtimeEvent.REALTIME_GO_TO_PARTICIPANT, (goToUserId) => {
    cameraControls.enabled = false
    const participantsOn3D = supervizPlugin.getParticipantsOn3D()
    const goToParticipant = participantsOn3D.find((participantOn3D) => {
      if (goToUserId === participantOn3D?.id) {
        return participantOn3D?.position
      }
    },
    )
    if (goToParticipant?.position) {
      if (myParticipantId !== goToUserId) {
        cameraControls.setPosition(goToParticipant.position.x, goToParticipant.position.y, goToParticipant.position.z)
      }
      setTimeout(() => {
        cameraControls.enabled = true
      // eslint-disable-next-line no-magic-numbers
      }, 800)
    }
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
 *  Sync Camera Position
 */
const syncCameraPosition = (newCameraPosition) => {
  superviz.setSyncProperty(CONTENT_SYNC_CAMERA_POSITION, newCameraPosition)
}

/**
 * unsubiscribe all when destroyed
 */
function unsubscribeAllEvents() {
  superviz.unsubscribe(SDK_SYNC_CUT_PLANES)
  superviz.unsubscribe(SDK_SYNC_PLANE_SELECTED)
  superviz.unsubscribe(SDK_SYNC_DESELECT_ITEMS)
  superviz.unsubscribe(CONTENT_SYNC_CHANGE_MODEL)
  superviz.unsubscribe(CONTENT_SYNC_CAMERA_POSITION)

  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_JOINED)
  superviz.unsubscribe(MeetingEvent.MEETING_LEAVE)
  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_LEFT)
  superviz.unsubscribe(MeetingEvent.MY_PARTICIPANT_UPDATED)
  superviz.unsubscribe(MeetingEvent.MEETING_HOST_CHANGE)
  superviz.unsubscribe(MeetingEvent.DESTROY)

  superviz.unsubscribe(RealtimeEvent.REALTIME_GO_TO_PARTICIPANT)
  superviz.unsubscribe(RealtimeEvent.REALTIME_FOLLOW_PARTICIPANT)
  superviz.unsubscribe(RealtimeEvent.REALTIME_GATHER)
}
