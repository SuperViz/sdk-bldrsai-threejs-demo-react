import React, {useEffect} from 'react'
import useStore from '../store/useStore'
import {useNavigate} from 'react-router-dom'


/**
 * Only container for the for the app.  Hosts the IfcViewer as well as
 * nav components.
 *
 * @return {object}
 */
export default function Invite({
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
      const userName = url.searchParams.get('user-name')
      const roomId = url.searchParams.get('room-id')
      document.getElementById('room-id').value = `${url.origin}/home/guest?room-id=${roomId}&user-type=guest`
      const payload = {
        userType,
        userName,
        roomId,
      }
      setMeetingStats(payload)

      document.getElementById('invite-url-button')?.addEventListener('click', (event) => {
        const roomIdInput = document.getElementById('room-id')

        if (!roomIdInput) {
          return
        }
        navigator.clipboard.writeText(roomIdInput.value)
        const checkboxState = document.getElementById('check-copy').checked
        if (checkboxState) {
          document.getElementById('check-copy').checked = false
          return
        }

        document.getElementById('check-copy').checked = true
        setTimeout(function() {
          document.getElementById('check-copy').checked = false
        // eslint-disable-next-line no-magic-numbers
        }, 3000)
      })
    })()
  }, [setMeetingStats, appPrefix])
  /* eslint-enable */

  const navigateToFile = () => {
    navigate({pathname: '/share'})
  }

  const cssClass = `
    .tooltip {
        position: relative;
    }

    .tooltip span {
        visibility: hidden;
        width: 5em;
        background-color: #57535f;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 9;
        FONT-FAMILY: 'roboto';
        top: 25px;
        FONT-SIZE: 12PX;
        left: 77%;
        margin-left: 1em;
        opacity: 0;
        transition: opacity 1s;
    }

    .tooltip span::after {
        content: "";
        position: absolute;
        top: -0.5em;
        border-width: 4px;
        border-style: solid;
        border-color: transparent transparent #57535f transparent;
    }

    input#check-copy {
        display: none;
    }

    .tooltip input:checked+span {
        visibility: visible;
        opacity: 1;
    }

    @media screen and (max-width: 935px) {
        input.sv-demo-invite-input {
            width: 235px;
        }
        .tooltip span {
            top: 38px;
            left: 71%;
        }
        sv-demo-image {
            display: none;
        }
    }
  `
  return (
    <div className="wrapper">
      <div className="content">
        <sv-demo-logo id="sv-demo-logo" name="https://production.cdn.superviz.com/static/superviz-white-logo.svg"/>
        <div className="content-wrapper">
          <div className="text-side">
            <sv-demo-title-left id="sv-demo-title" name="Want to invite someone?"/>
            <sv-demo-sub-title id="sv-demo-sub-title"
              name="We offer a full-function video conferencing layer for up to 16 participants, including chat, grid view and screen share.
              "
            />
          </div>
          <div className="box-side">
            <sv-demo-title-right id="sv-demo-title-right"
              name="Share the link below to invite someone to join you"
            />
            <sv-demo-image id="sv-demo-image"
              name="https://production.cdn.superviz.com/static/want-invite-someone.png"
            />
            <div className="invite-input">
              <label className="tooltip">
                <input type="text" className="sv-demo-invite-input" id="room-id"/>
                <input id="check-copy" type="checkbox"/>
                <span>Copied</span>
              </label>

              <sv-demo-invite-button id="invite-url-button" name="&nbsp;&nbsp;&nbsp;">
                <sv-demo-invite-image id="sv-demo-invite-image"
                  name="https://production.cdn.superviz.com/static/copy-icon.svg"
                />
              </sv-demo-invite-button>
            </div>
            <div
              onClick={navigateToFile}
              role="presentation"
            >
              <sv-demo-button id="join" name="JOIN"/>
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

