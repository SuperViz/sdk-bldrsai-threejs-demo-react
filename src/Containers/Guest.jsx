import React, {useEffect} from 'react'
import useStore from '../store/useStore'

// import {useNavigate, useSearchParams, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
// import useStore from '../store/useStore'


/**
 * Only container for the for the app.  Hosts the IfcViewer as well as
 * nav components.
 *
 * @return {object}
 */
export default function Guest({
  appPrefix,
}) {
  // React router
  const navigate = useNavigate()
  const setMeetingStats = useStore((state) => state.setMeetingStats)

  // Watch for path changes within the model.
  // TODO(pablo): would be nice to have more consistent handling of path parsing.
  useEffect(() => {
    (() => {
      if (appPrefix === '/share') {
        return
      }
      const url = new URL(document.URL)
      const userType = url.searchParams.get('user-type')
      const userName = 'Guest'
      const roomId = url.searchParams.get('room-id')
      const payload = {
        userType,
        userName,
        roomId,
      }
      setMeetingStats(payload)
    })()
  }, [setMeetingStats, appPrefix])
  /* eslint-enable */

  const navigateToFile = () => {
    navigate({pathname: '/share'})
  }

  return (
    <div>
      <sv-modal>
        <sv-modal-block/>
      </sv-modal>
      <div className="wrapper">
        <div className="content">
          <sv-demo-logo id="sv-demo-logo" name="https://production.cdn.superviz.com/static/superviz-white-logo.svg"/>
          <div className="content-wrapper">
            <div className="text-side">
              <sv-demo-title-left id="sv-demo-title" name="You’re been invited to a SuperViz demo meeting"/>
              <sv-demo-sub-title id="sv-demo-sub-title"
                name="The easiest way to bring people together inside of your 3D web applicaton"
              />
              <div
                onClick={navigateToFile}
                role="presentation"
              >
                <sv-demo-guest-button id="join" name="NEXT"/>
              </div>
            </div>
            <div className="box-side-guest">
              <div className="image-size">
                <sv-demo-guest-image className="image-size" id="sv-demo-guest-image"
                  name="https://production.cdn.superviz.com/static/bg-guest.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

