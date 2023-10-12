import {
	Provider,
	defaultTheme,
	Grid,
	View,
	Text,
	Image,
	Heading,
	Content,
	Button
} from '@adobe/react-spectrum';

import {
	minmax
} from '@adobe/react-spectrum';

import {
	Card,
	CardView,
	GridLayout
} from '@react-spectrum/card';

import LOGO from './static/LOGO.svg';
import assignCardBg from './static/image/assign_cardbg.jpg';
import assignCardLogo from './static/image/assign_logo.jpg';
import crawlerCardBg from './static/image/crawler_cardbg.jpg';
import crawlerCardLogo from './static/image/crawler_logo.jpg';

import toolCardDummy from './static/image/toolCardDummy.svg';



function _View ( props ) {
	if ( props.position ) {
		return (
			<View
			{...props}
			position={props.position.position ? props.position.position : 'static'}
			top={props.position.top ? props.position.top : 'auto'}
			bottom={props.position.bottom ? props.position.bottom : 'auto'}
			left={props.position.left ? props.position.left : 'auto'}
			right={props.position.right ? props.position.right : 'auto'}
			zIndex={props.position.zIndex ? props.position.zIndex : 'auto'}
			isHidden={props.position.isHidden ? props.position.isHidden : 'auto'}
			/>
		);
	} else {
		return (
			<View {...props}/>
		);
	}

}

function LogoImageHero ({ position, src }) {
	return (
		<View {...position}
		width='75%'
		maxWidth='400px'
		>
			<Image
			src = {src}
			alt = './static/LOGO.svg'
			/>
		</View>
	);
}

function CardBackgroundImage ({ position, src, alt }) {
	return (
		<View {...position}>
			<Image
			src={src}
			alt={alt}
			height='30%'
			maxHeight='60px'
			width='100%'
			maxwidth='200px'/>
		</View>
	);
}

function CardLogoImage ({ position, src, alt }) {
	return (
		<View {...position}
		width='48px'
		height='48px'
		overflow='hidden'
		borderRadius='medium'
		borderColor='gray-300'
		borderWidth='thin'
		>
			<Image
			src={src}
			width='48px'
			height='48px'/>
		</View>
	);
}


function CardTool ({ position, heading, content, src_logo, src_bg }) {
	return (
		<View {...position}
		maxWidth='280px'
		borderWidth='thin'
		borderRadius='small'
		borderColor='gray-50'
		overflow='hidden'
		>
			<View position='relative'>
				<CardLogoImage
				position={{position:'absolute', bottom:'-10px', left:'10px'}}
				src={src_logo}
				alt={heading + '_logo'}
				/>
				<CardBackgroundImage
				src={src_bg}
				alt={heading + '_bg'}
				/>
			</View>
			<Heading marginStart='10px'>{heading}</Heading>
			<Content marginStart='10px' marginBottom='10px'>{content}</Content>
		</View>
	);
}

function CardToolCollection ({ position }) {
	return (
		<View {...position}
		maxWidth = '840px'
		margin = '10px'
		marginY = '20px'
		>
			<Grid areas={[
				'upper-right upper-middle upper-left',
				'lower-right lower-middle lower-left'
			]}
			columns = {['1fr', '1fr', '1fr']}
			rows = {['auto', 'auto']}
			justifyContent='space-evenly'
			width='100%'
			height='100%'
			rowGap='size-300'
			columnGap='size-500'
			>
				<View gridArea="upper-right">
					<CardTool
					position = 'absolute'
					top = '100px'
					src_logo={assignCardLogo}
					src_bg={assignCardBg}
					heading='assign.tool'
					content='Assign players to roles for sections.'
					/>
				</View>
				<View gridArea="upper-middle">
					<CardTool
					src_logo={crawlerCardLogo}
					src_bg={crawlerCardBg}
					heading='crawler.tool'
					content='Survey site structures.'
					/>
				</View>
				<View gridArea="upper-left">
					<Image src={toolCardDummy}/>
				</View>
				<View gridArea="lower-right">
					<Image src={toolCardDummy}/>
				</View>
				<View gridArea="lower-middle">
					<Image src={toolCardDummy}/>
				</View>
				<View gridArea="lower-left">
					<Image src={toolCardDummy}/>
				</View>
			</Grid>
		</View>
	);
}


function ButtonOpenTheBox ({ position }) {
	return (
		<View {...position}
		margin = '20px'
		>
			<Button variant='accent'>
				<Text>OPEN THE BOX</Text>
			</Button>
		</View>
	);
}


function App() {

    return (
    	<Provider theme={defaultTheme}>
			<View>
				<Grid areas={[
					'header',
					'content',
					'footer'
				]}
				columns = { ['1fr'] }
				rows = { [ '33%', 'auto', 'auto' ] }
				justifyContent='space-between'
				justifyItems='stretch'
				>
					<View backgroundColor='gray-50' gridArea="header">
						<Grid
						height='100%'
						justifyContent='center'
						alignContent='center'
						justifyItems='center'
						>
							<LogoImageHero src={LOGO}/>	
						</Grid>
					</View>
					<View backgroundColor="gray-50" gridArea="content">
						<Grid
						height='100%'
						justifyContent='center'
						>
							<CardToolCollection/>
						</Grid>
					</View>
					<View backgroundColor='gray-50' gridArea="footer">
						<Grid
						height='100%'
						alignContent='center'
						justifyItems='center'
						>
							<ButtonOpenTheBox/>
						</Grid>
					</View>
				</Grid>
			</View>

	  </Provider>
  );
}

export default App;
