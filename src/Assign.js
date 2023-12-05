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
			<View gridArea='main-l' overflow='scroll' paddingX='10px'>
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
			<View gridArea='sidebar' padding='10px' paddingBottom='20px'>
			<Grid height='100%' justifyContent='stretch' alignContent='end' justifyItems='start'>
				<Slider label='sessions'
				value={numberOfSessions}
				onChange={setNumberOfSessions}
				defaultValue={5}
				minValue={1}
				maxValue={10}
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
			<View gridArea='footer' alignSelf='end' padding='10px' paddingBottom='20px'>
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
		setItemList([...itemList, {id: itemList.slice(-1)[0].id+1, name: "", tag:""}]);
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
	roles,
	numberOfSessions,
	minPerSession,
	setAssignAppPhase
}) {
	let [ sessions, setSessions ] = useState();

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min)
	}

	const gen2DArray = (m, n, val=0) => {
		return [...Array(m)].map( _ => [...Array(n)].map( _ => val));
	}

	const init = gen2DArray(roles.length, roles.length, [...players])
	console.log('init', init)

	let session_list = [...init];

	// assign
	//
	for ( let i = 0; i < roles.length; i++ ) {
		for ( let j = 0; j < roles.length; j++ ) {
			console.log(i, j, 'start')

			let r = getRandomInt(0, session_list[i][j].length);
			let a_ij = session_list[i][j][r]

			session_list[i][j] = a_ij

			for ( let k = j+1; k < roles.length; k++ ) {
				session_list[i][k] = session_list[i][k].filter(a => a != a_ij);
			}
			for ( let l = i+1; l < roles.length; l++ ) {
				session_list[l][j] = session_list[l][j].filter(a => a != a_ij);
			}
		}
	}

	session_list = session_list.map(
		( session, i ) => {
			return (
				{id: i, time: minPerSession, assign: session}
			)
		}
	)
	console.log(session_list)
	
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
				<Table players={players} roles={roles} sessions={session_list}></Table>
			</Grid>
			</View>
			<View gridArea='sidebar' padding='10px' paddingBottom='20px'>
			<Grid height='100%' justifyContent='stretch' alignContent='end' justifyItems='start'>
				<Button
				variant="negative"
				aria-label=""
				marginTop='40px'
				onPress={e => setAssignAppPhase('sessionList')}
				>
					Back To Edit
				</Button>
				<Button
				variant="negative"
				aria-label=""
				marginTop='40px'
				onPress={e => setAssignAppPhase('sessionList')}
				>
					Reroll
				</Button>
				<Button
				variant="accent"
				aria-label=""
				marginTop='40px'
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
			<TableHeader>
				{roles.map(
					( role ) => {
						return (
							<Column>{role.name}</Column>
						);
					}
				)}
			</TableHeader>
			<TableBody>
				{sessions.map(
					( session ) => {
						return (
							<Row>
								{session.assign.map(
									( player ) => {
										return (
											<Cell>{player.name}</Cell>
										);
									}
								)}
							</Row>
						);
					}
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
		{id: 0, name: "のぐち", tag: ""},
		{id: 1, name: "ノグチ", tag: ""},
		{id: 2, name: "野口", tag: ""},
		{id: 3, name: "NOGUCHI", tag: ""}
	])
	let [ roles, setRoles ] = useState([
		{id: 0, name: "進行" , tag: ""},
		{id: 1, name: "書記", tag: ""},
		{id: 2, name: "計時", tag: ""},
		{id: 4, name: "発表", tag: ""},
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
			roles={roles}
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
