import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

/**
 *
 * @param {*} props
 * @returns object with the user data
 */
const UserProvider = (props) => {
	const [user, setUser] = useState(null);
	return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
