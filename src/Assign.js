import React, {useState} from 'react';
import {
	Provider,
	defaultTheme,
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
	setAssignAppPhase
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
				onChange={setNumberOfSessions}
				defaultValue={1}
				minValue={1}
				maxValue={players.length}
				/>
				<Slider label='time'
				value={minPerSession}
				onChange={setMinPerSession}
				defaultValue={10}
				minValue={1}
				maxValue={60}
				getValueLabel={(time) => `${time} min/session`}
				/>
				<Button
				variant="accent"
				aria-label=""
				marginTop='40px'
				onPress={e => setAssignAppPhase('sessionList')}
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
		processed.forEach(
			( item, i ) => { item.id = i }
		)
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

function SessionList ({
	players,
	setPlayers,
	roles,
	setRoles,
	numberOfSessions,
	minPerSession,
	setAssignAppPhase
}) {
	// player数とrole数の数を揃えるようにダミーを入れる
	// nameが空の要素を追加しておく
	let d = players.length - roles.length
	if ( d < 0 ) {
		for ( let i = 0; i < -d; i++ ) {
			setPlayers([ ...players, {id: players.slice(-1)[0].id+1, name: "", tag:"", hidden: true} ])
		}
	} else if ( d > 0 ) {
		for ( let i = 0; i < d; i++ ) {
			setRoles([...roles, {id: roles.slice(-1)[0].id+1, name: "", tag: "", hidden: true} ])
		}
	}

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min)
	}

	const gen2DArray = (m, n, val=0) => {
		return [...Array(m)].map( _ => [...Array(n)].map( _ => val));
	}

	// Core Algorithm
	const makeAssign = ( initArray ) => {
		let slot;
		let i, j, r;
		for ( i = 0; i < initArray.length; i++ ) {
			while ( ! initArray[i].every(elm => ! Array.isArray(elm)) ) {
				// initArray[i]の全ての要素がArrayでなくなるまでループする
				//
				slot = initArray[i].map(
					( s ) => {
						if ( Array.isArray(s) ) {
							return s.length
						} else {
							return Infinity
						}
					}
				);
				j = slot.findIndex( elm => elm == Math.min(...slot) )
				r = getRandomInt(0, initArray[i][j].length);

				let a_ij = initArray[i][j][r]

				for ( let k = 0; k < roles.length; k++ ) {
					if ( Array.isArray(initArray[i][k]) ) {
						initArray[i][k] = initArray[i][k].filter(a => a != a_ij);
					}
				}
				for ( let l = i+1; l < initArray.length; l++ ) {
					initArray[l][j] = initArray[l][j].filter(a => a != a_ij);
				}

				initArray[i][j] = a_ij

			}
		}
		// Tableコンポーネントに渡せる形に整形
		const session_list = initArray.map(
			( session, i ) => {
				return Object.assign({id: i}, session)
			}
		)

		console.log('slot', [...slot])
		console.log('sessions', [...session_list])
		return session_list
	}

	const init = gen2DArray(numberOfSessions, roles.length, [...players])
	let session_list = makeAssign(init);

	let [ sessions, setSessions ] = useState([...session_list]);
	
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
			<View gridArea='main' overflow='scroll' paddingX='10px'>
			<Grid>
				<Heading level={1}>Sessions</Heading>
				<Table players={players} roles={roles} sessions={sessions}></Table>
			</Grid>
			</View>
			<View gridArea='sidebar' padding='10px' paddingBottom='20px'>
			<Grid height='100%' justifyContent='stretch' alignContent='end' justifyItems='start'>
				<Button
				variant="negative"
				aria-label=""
				marginTop='40px'
				onPress={e => setAssignAppPhase('input')}
				>
					Back To Edit
				</Button>
				<Button
				variant="negative"
				aria-label=""
				marginTop='10px'
				onPress={ e => {
					const init = gen2DArray(numberOfSessions, roles.length, [...players])
					let session_list = makeAssign(init);
					setSessions([...session_list]);
				}}
				>
					Reroll
				</Button>
				<Button
				variant="accent"
				aria-label=""
				marginTop='20px'
				onPress={e => setAssignAppPhase('sessionList')}
				>
					Go Ahead!
				</Button>
			</Grid>
			</View>
			<View gridArea='footer' alignSelf='end' padding='10px' paddingBottom='20px'>
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
			<TableHeader columns={roles.filter(role => role.hidden == false)}>
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
	let [ assignAppPhase, setAssignAppPhase ] = useState("input");
	let [ players, setPlayers ] = useState([
		{id: 0, name: "のぐち", tag: "", hidden: false},
		{id: 1, name: "ノグチ", tag: "", hidden: false},
		{id: 2, name: "野口", tag: "", hidden: false},
		{id: 3, name: "NOGUCHI", tag: "", hidden: false},
		{id: 4, name: "noguchi", tag: "", hidden: false},
		{id: 5, name: "能口", tag: "", hidden: false}
	])
	let [ roles, setRoles ] = useState([
		{id: 0, name: "進行" , tag: "", hidden: false},
		{id: 1, name: "書記", tag: "", hidden: false},
		{id: 2, name: "計時", tag: "", hidden: false},
		{id: 3, name: "発表", tag: "", hidden: false},
	])
	let [ numberOfSessions, setNumberOfSessions ] = useState(1)
	let [ minPerSession, setMinPerSession ] = useState(1)

	let rendered;
	if ( assignAppPhase === "input" ) {
		rendered = <InputPage
			players={players}
			setPlayers={setPlayers}
			roles={roles}
			setRoles={setRoles}
			numberOfSessions={numberOfSessions}
			setNumberOfSessions={setNumberOfSessions}
			minPerSession={minPerSession}
			setMinPerSession={setMinPerSession}
			setAssignAppPhase={setAssignAppPhase}
		/>
	} else if ( assignAppPhase === "sessionList" ) {
		rendered = <SessionList
			players={players}
			setPlayers={setPlayers}
			roles={roles}
			setRoles={setRoles}
			numberOfSessions={numberOfSessions}
			minPerSession={minPerSession}
			setAssignAppPhase={setAssignAppPhase}
		/>
	} else if ( assignAppPhase === "summary" ) {
		rendered = <Summary
			setAssignAppPhase={setAssignAppPhase}
		/>
	} else {
		rendered = <InputPage
			players={players}
			roles={roles}
			setAssignAppPhase={setAssignAppPhase}
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
