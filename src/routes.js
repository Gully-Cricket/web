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

import PlayerList from "./views/players/List";
import PlayerView from "./views/players/View";
import PlayerAdd from "./views/players/Add";
import PlayerEdit from "./views/players/Edit";

import TeamList from "./views/teams/List";
import TeamView from "./views/teams/View";
import TeamAdd from "./views/teams/Add";
import TeamEdit from "./views/teams/Edit";

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
		component: PlayerList
	},
	{
		path: "/players/add",
		exact: true,
		layout: DefaultLayout,
		component: PlayerAdd
	},
	{
		path: "/players/:playerId",
		exact: true,
		layout: DefaultLayout,
		component: PlayerView
	},
	{
		path: "/players/:playerId/edit",
		exact: true,
		layout: DefaultLayout,
		component: PlayerEdit
	},

	{
		path: "/teams",
		exact: true,
		layout: DefaultLayout,
		component: TeamList
	},
	{
		path: "/teams/add",
		exact: true,
		layout: DefaultLayout,
		component: TeamAdd
	},
	{
		path: "/teams/:teamId",
		exact: true,
		layout: DefaultLayout,
		component: TeamView
	},
	{
		path: "/teams/:teamId/edit",
		exact: true,
		layout: DefaultLayout,
		component: TeamEdit
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
