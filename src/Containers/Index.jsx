import React from 'react'
import {useNavigate} from 'react-router-dom'


/**
 * Only container for the for the app.  Hosts the IfcViewer as well as
 * nav components.
 *
 * @return {object}
 */
export default function Index() {
  // React router
  const navigate = useNavigate()

  const navigateToFile = () => {
    const userMeetingName = document.getElementById('username').value
    const roomId = generateUniqueId()
    navigate({pathname: `/home/invite?room-id=${roomId}&user-type=host&user-name=${userMeetingName}`})
  }

  /**
   * @return {string} text to generate meeting ID.
   */
  function generateUniqueId() {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    // eslint-disable-next-line no-magic-numbers
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  const cssClass = `
    @media screen and (max-width: 935px) {
      sv-demo-image {
        display: none;
      }
    }
  `
  return (
    <div>
      <sv-modal>
        <sv-modal-block/>
      </sv-modal>
      <div className="wrapper">
        <div className="content">
          <sv-demo-logo name="https://production.cdn.superviz.com/static/superviz-white-logo.svg"/>
          <div className="content-wrapper">
            <div className="text-side">
              <sv-demo-title-left name="Integrate SuperViz into Open Source IFC viewer."/>
            </div>
            <div className="box-side">
              <sv-demo-title-right name="Add your name to get started"/>
              <sv-demo-image name="https://production.cdn.superviz.com/static/avatar-name.png"/>
              <input type="text" className="sv-demo-input" id="username"/>
              <div
                onClick={navigateToFile}
                role="presentation"
              >
                <sv-demo-button name="NEXT" id="next"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {cssClass}
      </style>
    </div>
  )
}
