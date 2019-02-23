import React, { useState, useCallback} from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

export default function Persons ({ persons }) {
  const [personId, setPersonId] = useState();

  const dispatch = useDispatch();
  const selectPerson = useCallback((personId) => {
    console.log('personId');
    console.log(personId);
    dispatch({
      type: 'server/selectperson',
      data: personId
    })
  }, [persons]);

  return (
    <div>
      {
        persons.map(({ id, avatar }) => (
          <div key={id} onClick={setPersonId}>
            <img src={`public/avatars/${avatar}`}/>
          </div>
        ))
      }
    </div>
  )
}
