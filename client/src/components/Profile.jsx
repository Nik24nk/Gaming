import React from 'react'

function Profile(props) {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src='https://static.miraheze.org/greatcharacterswiki/thumb/3/3d/Eren_Paths.jpg/330px-Eren_Paths.jpg' />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a onClick={props.logout}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Profile;