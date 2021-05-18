import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel, openModal } from '../../../redux/reducer.js';
import { setFocus } from '../../../utilities.js';
import cn from 'classnames';
const closeAllMenu = (e) => {
  document.querySelectorAll(`div[data-channel-id]`).forEach((item) => {
    item.classList.remove('focus-channel');
  });

  if (e.target.classList[0] !== 'channel-menu') {
    document.querySelectorAll(`div[data-id].show`).forEach((menu) => {
      menu.classList.remove('show');
    });
  }
};
const Channels = () => {
  useEffect(() => {
    document.removeEventListener('click', closeAllMenu);

    document.addEventListener('click', closeAllMenu);
  });
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  const dispatch = useDispatch();

  const handleSwitchChannel = (id) => () => {
    dispatch(switchChannel(id));
  };

  const handleOpenModalAdd = (extra = null) => {
    dispatch(openModal({ isOpened: true, type: 'add', extra }));
  };

  const handleOpenModalRename = (e, extra = null) => {
    e.stopPropagation();
    document.querySelectorAll(`div[data-channel-id]`).forEach((item) => {
      item.classList.remove('focus-channel');
    });
    document.querySelectorAll(`div[data-id]`).forEach((menu) => {
      menu.classList.remove('show');
    });
    dispatch(openModal({ isOpened: true, type: 'rename', extra }));
  };

  const handleOpenModalRemove = (e, extra = null) => {
    e.stopPropagation();
    document.querySelectorAll(`div[data-channel-id]`).forEach((item) => {
      item.classList.remove('focus-channel');
    });
    document.querySelectorAll(`div[data-id]`).forEach((menu) => {
      menu.classList.remove('show');
    });
    dispatch(openModal({ isOpened: true, type: 'remove', extra }));
  };

  const handleChannelMenu = (id) => (e) => {
    e.stopPropagation();
    document.querySelectorAll(`div[data-channel-id]`).forEach((item) => {
      item.classList.remove('focus-channel');
    });
    document.querySelectorAll(`div[data-id]`).forEach((menu) => {
      if (Number(menu.dataset.id) === Number(id)) {
        return;
      }
      menu.classList.remove('show');
    });
    setFocus('input[name="body"]');
    document.querySelector(`div[data-id="${id}"]`).classList.toggle('show');
    document
      .querySelector(`div[data-channel-id="${id}"]`)
      .classList.add('focus-channel');
  };

  return (
    <div className='channels'>
      <div className='channels-header'>
        <h2>Чаты</h2>
        <button onClick={(e) => handleOpenModalAdd()}>+</button>
      </div>
      <div className='channels-box'>
        {channels.map(({ id, name, removable }) => {
          const isCurrentChannel = id === currentChannelId;
          const channelsClass = cn({
            'channels-item': true,
            'current-channel': isCurrentChannel,
          });
          return (
            <div
              className={channelsClass}
              key={id}
              data-channel-id={id}
              onClick={handleSwitchChannel(id)}
            >
              <button>
                <span className='channel-name'>{name}</span>
              </button>
              {removable ? (
                <>
                  <button
                    className='channel-menu-button'
                    onClick={handleChannelMenu(id)}
                  >
                    &#183;&#183;&#183;
                  </button>
                  <div className='channel-menu' data-id={id}>
                    <button onClick={(e) => handleOpenModalRename(e, id)}>
                      rename
                    </button>
                    <br />
                    <button onClick={(e) => handleOpenModalRemove(e, id)}>
                      delete
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
