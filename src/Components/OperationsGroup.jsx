import React from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import useTheme from '@mui/styles/useTheme'
import useStore from '../store/useStore'
import {assertDefined} from '../utils/assert'
import {hexToRgba} from '../utils/color'
import {useIsMobile} from './Hooks'
import AboutControl from './About/AboutControl'
import CameraControl from './CameraControl'
import CutPlaneMenu from './CutPlaneMenu'
import ShareControl from './ShareControl'
import {TooltipIconButton} from './Buttons'
import ClearIcon from '../assets/icons/Clear.svg'


/**
 * OperationsGroup contains tools for sharing, notes, properties, cut
 * plane, deselect, theme change and about.
 *
 * @property {Function} deselectItems deselects currently selected element
 * @return {React.Component}
 */
export default function OperationsGroup({deselectItems}) {
  const cutPlanes = useStore((state) => state.cutPlanes)
  const levelInstance = useStore((state) => state.levelInstance)
  const selectedElement = useStore((state) => state.selectedElement)
  const isCollaborationGroupVisible = useStore((state) => state.isCollaborationGroupVisible)
  const isModelInteractionGroupVisible = useStore((state) => state.isModelInteractionGroupVisible)
  const isMobile = useIsMobile()


  const isSelected = () => {
    const ifSelected = (
      selectedElement !== null ||
      cutPlanes.length !== 0 ||
      levelInstance !== null
    )
    return ifSelected
  }


  const theme = useTheme()
  const separatorOpacity = 0.1
  const separatorColor = hexToRgba(assertDefined(theme.palette.primary.contrastText), separatorOpacity)
  // When the model has dark/black colors, then the icons (also dark)
  // disappear. This keeps them visible.
  const bgOpacity = 0.2
  const bgColor = hexToRgba(assertDefined(theme.palette.scene.background), bgOpacity)
  const positionOnDevice = isMobile ? '0px' : '200px'

  return (
    <Box
      sx={{
        'right': `${positionOnDevice}`,
        'position': 'absolute',
        'display': 'flex',
        'flexDirection': 'column',
        'backgroundColor': `${bgColor}`,
        'padding': '1em',
        '@media (max-width: 900px)': {
          padding: '1em 0.5em',
        },
        '.MuiButtonGroup-root + .MuiButtonGroup-root': {
          marginTop: '0.5em',
          paddingTop: '0.5em',
          borderTop: `solid 1px ${separatorColor}`,
          borderRadius: 0,
        },
        '.MuiButtonBase-root + .MuiButtonBase-root': {
          marginTop: '0.5em',
        },
      }}
    >

      {isModelInteractionGroupVisible &&
       <ButtonGroup orientation='vertical'>
         <CutPlaneMenu/>
         {/* <ExtractLevelsMenu/> */}
         <TooltipIconButton
           title='Clear'
           onClick={deselectItems}
           selected={isSelected()}
           icon={<ClearIcon/>}
         />

       </ButtonGroup>
      }
      {isCollaborationGroupVisible &&
       <ButtonGroup orientation='vertical'>
         <ShareControl/>
       </ButtonGroup>
      }
      <AboutControl/>
      {/* Invisible */}
      <CameraControl/>
    </Box>
  )
}
