import React, {useState} from 'react';
import {
	Grid,
	View,
	Heading,
	Content,
	Text,
	Image,
	Button,
	ActionButton,
	Form,
	TextField,
	Radio,
	RadioGroup,
	Slider,
	Switch,
	Cell,
	Column,
	Row,
	TableView,
	TableBody,
	TableHeader
} from '@adobe/react-spectrum';

import AddToSelection from '@spectrum-icons/workflow/AddToSelection';
import Close from '@spectrum-icons/workflow/Close';


function InputPage ({
	players,
	setPlayers,
	roles,
	setRoles,
	numberOfSessions,
	setNumberOfSessions,
	minPerSession,
	setMinPerSession,
	setAppPhase
}) {
	return (
		<View height='100%'>
		<Grid height='100%' 
		columnGap='10px'
		columns='1fr 1fr 1fr 1fr 1fr 1fr auto'
		areas={[
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'main-l main-l main-l main-r main-r main-r sidebar sidebar',
			'footer footer footer footer footer footer sidebar sidebar'
		]}>
			<View gridArea='main-l' overflow='scroll' paddingX='10px' paddingLeft='30px'>
				<FormList
					title='Players'
					label='name'
					itemList={players}
					setItemList={setPlayers}
				/>
			</View>
			<View gridArea='main-r' overflow='scroll' paddingX='10px'>
				<FormList
					title='Roles'
					label='name'
					itemList={roles}
					setItemList={setRoles}
				/>
			</View>
			<View gridArea='sidebar' padding='10px' paddingBottom='20px' paddingRight='30px'>
			<Grid height='100%' justifyContent='stretch' alignContent='end' justifyItems='start'>
				<Slider label='sessions'
				value={numberOfSessions}
				onChange={value => setNumberOfSessions(value)}
				defaultValue={1}
				minValue={1}
				maxValue={10}
				getValueLabel={ value => `${value}` }
				isFilled
				/>
				<Slider label='time'
				value={minPerSession}
				onChange={setMinPerSession}
				defaultValue={10}
				minValue={1}
				maxValue={60}
				getValueLabel={ value => `${value} min/session`}
				isFilled
				/>
				<Button
				variant="accent"
				aria-label=""
				marginTop='40px'
				onPress={ ( e ) => {
					// player数とrole数の数を揃えるようにダミーとして
					// nameが空の要素を追加しておく
					let d = players.length - roles.length
					let dummy;
					if ( d < 0 ) {
						dummy = [...Array(-d)].map( ( _ , i ) => { return {id: players.slice(-1)[0].id+i+1, name: "", tag: "", hidden: true} });
						setPlayers([ ...players, ...dummy ])
					} else if ( d > 0 ) {
						dummy = [...Array(d)].map( ( _ , i ) => { return {id: roles.slice(-1)[0].id+i+1, name: "", tag: "", hidden: true} });
						setRoles([ ...roles, ...dummy ])
					}
					setAppPhase('sessionCollection')
				}}
				>
				Make Sessions!
				</Button>
			</Grid>
			</View>
			<View gridArea='footer' alignSelf='end' padding='10px' paddingBottom='20px' paddingX='30px'>
				<Heading level={3} margin={0}>assign.tool</Heading>
			</View>
		</Grid>
		</View>

	);
}


function FormList ({
	title,
	label,
	itemList,
	setItemList
}) {
	const handleItemListAdd = ( e ) => {
		setItemList([...itemList, {id: itemList.slice(-1)[0].id+1, name: "", tag:"", hidden: false}]);
	}

	const handleItemListChange = ( editedItemId, editedItemText ) => {
		setItemList( itemList.map(
			( item ) => {
				if ( item.id === editedItemId ) {
					return { ...item, name: editedItemText };
				} else {
					return item;
				}
			}
		));
	}

	const handleItemListAllClear = () => {
		setItemList( itemList.map(
			( item ) => {
				return { ...item, name: "" };
			}
		));
	}

	const handleItemListDelete = ( deletedItemId ) => {
		let processed = itemList.filter(
			( item ) => item.id != deletedItemId
		)

		// reset_index
		//
		processed.forEach(( item, i ) => { item.id = i })
		setItemList([...processed]);
	}

	return (
		<View width='100%'>
		<Grid width='100%'>
			<Heading level={1}>{title}</Heading>
			<View>
			<Grid justifyContent='right'>
				<View>
					<ActionButton
					isQuiet
					variant="primary"
					onPress={handleItemListAdd}
					>
						<AddToSelection/>
					</ActionButton>
				</View>
			</Grid>
			</View>
			<Form aria-labelledby="label-3">
				<ul style={{width: '100%', padding: 0, listStyle: 'none'}}>
				{itemList.map(
					( item ) => (
						<li key={item.id} style={{paddingBottom: '10px'}}>
							<Grid areas={['left right']} justifyContent='space-between'>
								<View>
								<TextField
								width='120%'
								minWidth='200px'
								maxWidth='400px'
								label={label}
								labelPosition='side'
								value={item.name}
								isQuiet
								onChange={e => handleItemListChange(item.id, e)}>
								</TextField>
								</View>
								<View>
								{ itemList.length <= 1 ? (
									<ActionButton isQuiet>
										<Close/>
									</ActionButton>
								) : (
									<ActionButton
										isQuiet
										onPress={e => handleItemListDelete(item.id)}
									>
										<Close/>
									</ActionButton>
								)}
								</View>
							</Grid>
						</li>
					)
				)}
				</ul>
			</Form>
			<Grid justifyContent='start' marginY='10px'>
				<View>
					<Button
					variant='negative'
					style='outline'
					onPress={e => handleItemListAllClear()}
					>
						All {title} Clear
					</Button>
				</View>
			</Grid>
		</Grid>
		</View>
	)
}


function SessionCollection ({
	players,
	setPlayers,
	roles,
	setRoles,
	numberOfSessions,
	minPerSession,
	setAppPhase
}) {
	//console.log('players', players)
	//console.log('roles', roles)

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min)
	}

	const gen2DArray = (m, n, val=0) => {
		return [...Array(m)].map( _ => [...Array(n)].map( _ => val));
	}

	const makeAssign = (n_sessions, players, roles) => {

		const init = gen2DArray(n_sessions, roles.length, [...players])
		let e, i, j, k, l, p, q, r, s; // 適当に使う

		// Core Algorithm
		// n_sessions =< players.lengthの場合にうまく機能する。
		//
		for ( i = 0; i < n_sessions; i++ ) {
			//console.log('session', i)
			// count slot for each player at the start of each session i
			let slots = [...Array(players.length)].map( _ => []).map(
				( slot, k ) => {
					p = players.filter( player => player.id == k ).pop()
					init[i].forEach(
						( role , l ) => {
							if ( role.includes(p) ) {
								slot.push(l)
							}
						}
					);
					//console.log('slot of player k', k, slot)
					return slot
				}
			);

			// init[i]の全ての要素がArrayでなくなるまでループする
			//
			// 1ループでsession iのcolumn jに入るplayer kを決める
			// ループごとに決まったplayerとcolumnに応じてとslotsとinit[i]を適切に修正していく
			//
			// したがってループするごとにinitやslotといった同じ配列を修正しているため
			// コードを読むときは注意してね
			//
			while ( ! init[i].every(elm => ! Array.isArray(elm)) ) {

				// slot数が最小のplayer kとそのslot sを探す
				//
				const playersWhoHaveMinimumSlots = slots.filter( ( s ) => {
					return s.length == Math.min(...slots.map( slot => Array.isArray(slot) ? slot.length : slot ))
				});
				r = getRandomInt(0, playersWhoHaveMinimumSlots.length);
				s = playersWhoHaveMinimumSlots[r];
				k = slots.findIndex( e => e === s )

				// player kのslot sに含まれるカラム eのうち、候補playerの数が最小のカラムを探す
				//
				j = s.find(
					( e ) => { 
						return init[i][e].length == Math.min(...s.map(
							( f ) => { 
								return Array.isArray(init[i][f]) ? init[i][f].length : Infinity 
							}
						))
					}
				)

				//console.log('assign a player', k, 'to role', j)
				//
				let a_ij = init[i][j].filter( player => player.id == k ).pop()
				init[i][j] = a_ij

				// initが保持しているカラムの候補playerの修正
				//
				// session iの各カラムと
				// session i以降のカラムjから
				// 割り当てられたplayer kを除外する
				for ( let l = 0; l < roles.length; l++ ) {
					if ( Array.isArray(init[i][l]) ) {
						init[i][l] = init[i][l].filter(player => player != a_ij);
					}
				}
				for ( let l = i+1; l < init.length; l++ ) {
					init[l][j] = init[l][j].filter(player => player != a_ij);
				}

				// playerの保持しているslotの修正
				//
				// カラムに割り当てられたplayerのslotはInfinityとする
				slots[k] = Infinity;

				// k以外の、まだ割り当てられていないplayerについて、
				// slotからカラムjを除外する
				slots = slots.map(
					( slot, l ) => {
						//console.log('slot of player l ', l, slot)
						if ( Array.isArray(slot) && slot.includes(j) ) {
							return slot.toSpliced(slot.findIndex(s => s == j), 1)
						} else {
							return slot
						}
					}
				)
			}
		}

		return init

	}

	const formulateAssign = (n_sessions, players, roles) => {
		let sessions = []
		let b = n_sessions;
		while ( b > 0 ) {
			sessions = [...sessions, ...makeAssign(Math.min(b, players.length), players, roles)];
			b -= players.length
		}

		for ( let i = 0; i < sessions.length; i++ ) {
			let r = getRandomInt(0, i)
			let tmp = sessions[i]
			sessions[i] = sessions[r]
			sessions[r] = tmp
		}

		return sessions.map(( session, i ) => Object.assign({id: i}, session))

	}

	let sessions = formulateAssign(numberOfSessions, players, roles);

	return (
		<SessionInit
		players={players}
		setPlayers={setPlayers}
		roles={roles}
		setRoles={setRoles}
		sessions={sessions}
		formulateAssign={formulateAssign}
		setAppPhase={setAppPhase}
		/>
	)
}

function SessionInit ({
	players,
	setPlayers,
	roles,
	sessions,
	setRoles,
	formulateAssign,
	setAppPhase
}) {
	const [ sessionList, setSessionList ] = useState([...sessions]);
	const [ sessionNo, setSessionNo ] = useState(0);	

	const makeClean = () => {
		setPlayers([...players.filter( player => !player.hidden )])
		setRoles([...roles.filter( role => !role.hidden )])
	}
	
	return (
		<Grid height='100%' 
		columnGap='10px'
		columns='1fr 1fr 1fr 1fr 1fr 1fr auto auto'
		areas={[
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'main main main main main main sidebar sidebar',
			'footer footer footer footer footer footer sidebar sidebar'
		]}>
			<View gridArea='main' overflow='scroll' paddingX='10px' paddingLeft='30px'>
			<Grid>
				<Heading level={1}>Sessions</Heading>
				<Table players={players} roles={roles} sessions={sessionList}></Table>
			</Grid>
			</View>
			<View gridArea='sidebar' padding='10px' paddingBottom='20px' paddingRight='30px'>
			<Grid height='100%' justifyContent='stretch' alignContent='end' justifyItems='start'>
				<Button
				variant="negative"
				aria-label=""
				marginTop='40px'
				onPress={e => {
					makeClean()
					setAppPhase('input')
				}}
				>
					Back To Edit
				</Button>
				<Button
				variant="negative"
				aria-label=""
				marginTop='10px'
				onPress={ e => {
					let session_list = formulateAssign(sessions.length, players, roles);
					setSessionList([...session_list]);
				}}
				>
					Reroll
				</Button>
				<Button
				variant="accent"
				aria-label=""
				marginTop='20px'
				onPress={e => setSessionNo(0)}
				isDisabled
				>
					Go Ahead!
				</Button>
			</Grid>
			</View>
			<View gridArea='footer' alignSelf='end' padding='10px' paddingX='30px' paddingBottom='20px'>
				<Heading level={3} margin={0}>assign.tool</Heading>
			</View>
		</Grid>
	);
}

function Table ({
	players,
	roles,
	sessions
}) {
	return (
		<TableView>
			<TableHeader columns={roles.filter(role => !role.hidden )}>
				{ role => (
					<Column key={role.id}>{role.name}</Column>
				)}
			</TableHeader>
			<TableBody items={sessions}>
				{ item => (
					<Row>
						{ columnKey => (
							<Cell>{ item[columnKey] == undefined ? "" : item[columnKey].name}</Cell>
						)}
					</Row>
				)}
			</TableBody>
		</TableView>
	);
}

function Session () {
}

function Summary () {
}

function Assign () {
	let [ appPhase, setAppPhase ] = useState("input");
	let [ players, setPlayers ] = useState([
		{id: 0, name: "のぐち", tag: "", hidden: false},
		{id: 1, name: "ノグチ", tag: "", hidden: false},
		{id: 2, name: "野口", tag: "", hidden: false},
		{id: 3, name: "NOGUCHI", tag: "", hidden: false},
		{id: 4, name: "noguchi", tag: "", hidden: false}
	])
	let [ roles, setRoles ] = useState([
		{id: 0, name: "進行" , tag: "", hidden: false},
		{id: 1, name: "書記", tag: "", hidden: false},
		{id: 2, name: "計時", tag: "", hidden: false},
		{id: 3, name: "発表", tag: "", hidden: false},
		{id: 4, name: "監督", tag: "", hidden: false},
	])
	let [ numberOfSessions, setNumberOfSessions ] = useState(1)
	let [ minPerSession, setMinPerSession ] = useState(1)

	let rendered;
	if ( appPhase === "input" ) {
		rendered = <InputPage
			players={players}
			setPlayers={setPlayers}
			roles={roles}
			setRoles={setRoles}
			numberOfSessions={numberOfSessions}
			setNumberOfSessions={setNumberOfSessions}
			minPerSession={minPerSession}
			setMinPerSession={setMinPerSession}
			setAppPhase={setAppPhase}
		/>
	} else if ( appPhase === "sessionCollection" ) {
		rendered = <SessionCollection
			players={players}
			setPlayers={setPlayers}
			roles={roles}
			setRoles={setRoles}
			numberOfSessions={numberOfSessions}
			minPerSession={minPerSession}
			setAppPhase={setAppPhase}
		/>
	} else if ( appPhase === "summary" ) {
		rendered = <Summary
			setAppPhase={setAppPhase}
		/>
	} else {
		rendered = <InputPage
			players={players}
			roles={roles}
			setAppPhase={setAppPhase}
			setPlayers={setPlayers}
			setRoles={setRoles}
		/>
	}

    return (
		<View height='100vh'>
			{rendered}
		</View>
  );
}

export default Assign;
