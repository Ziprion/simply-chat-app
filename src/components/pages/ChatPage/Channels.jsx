import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Channels = () => {
  const count = useSelector((state) => state.channelsInfo.channels);
  const dispatch = useDispatch();
  return (
    <div className='channels'>
      <div>
        <div>
          {count.map((el) => (
            <span key={el.id}>{el.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;
