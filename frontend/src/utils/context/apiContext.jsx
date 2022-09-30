import React, { useState } from 'react';

const ApiContext = React.createContext([{}, () => {}]);

/**
 *
 * @param {*} props mockedDatas
 * @returns {string} mockedStatus Value of the toggle for the API or Mocked datas {true, false}
 */
const ApiProvider = (props) => {
	const [mockedStatus, setMockedStatus] = useState(null);
	return <ApiContext.Provider value={[mockedStatus, setMockedStatus]}>{props.children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };
