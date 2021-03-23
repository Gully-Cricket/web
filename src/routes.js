import React from "react";
import {Redirect} from "react-router-dom";

// Layout Types
import {DefaultLayout} from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Error404 from "./views/404";
import Error500 from "./views/500";
import Players from "./views/players/PlayerList";
import ViewPlayer from "./views/players/ViewPlayer";
import AddPlayer from "./views/players/AddPlayer";
import EditPlayer from "./views/players/EditPlayer";

export default [
	{
		path: "/",
		exact: true,
		layout: DefaultLayout,
		component: () => <Redirect to="/blog-overview"/>
	},
	{
		path: "/players",
		exact: true,
		layout: DefaultLayout,
		component: Players
	},
	{
		path: "/players/add",
		exact: true,
		layout: DefaultLayout,
		component: AddPlayer
	},
	{
		path: "/players/:playerId",
		layout: DefaultLayout,
		component: ViewPlayer
	},
	{
		path: "/players/:playerId/edit",
		layout: DefaultLayout,
		component: EditPlayer
	},
	{
		path: "/blog-overview",
		layout: DefaultLayout,
		component: BlogOverview
	},
	{
		path: "/user-profile-lite",
		layout: DefaultLayout,
		component: UserProfileLite
	},
	{
		path: "/add-new-post",
		layout: DefaultLayout,
		component: AddNewPost
	},
	{
		path: "/errors",
		layout: DefaultLayout,
		component: Error500
	},
	{
		path: "/notfound",
		layout: DefaultLayout,
		component: Error404
	},
	{
		path: "/components-overview",
		layout: DefaultLayout,
		component: ComponentsOverview
	},
	{
		path: "/tables",
		layout: DefaultLayout,
		component: Tables
	},
	{
		path: "/blog-posts",
		layout: DefaultLayout,
		component: BlogPosts
	}
];
