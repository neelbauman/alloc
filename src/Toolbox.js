import {
	Grid,
	View,
	Text,
	Image,
	Heading,
	Content,
	Link,
	AlertDialog,
	DialogTrigger,
	Button
} from '@adobe/react-spectrum';

// Images
import LOGO from './static/LOGO.svg';
import assignCardBg from './static/image/assign_cardbg.jpg';
import assignCardLogo from './static/image/assign_logo.jpg';
import crawlerCardBg from './static/image/crawler_cardbg.jpg';
import crawlerCardLogo from './static/image/crawler_logo.jpg';
import toolCardDummy from './static/image/toolCardDummy.svg';


function Hero({ position, src }) {
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

function ToolCardBackgroundImage ({ position, src, alt }) {
	return (
		<View {...position}>
			<Image
				src={src}
				alt={alt}
				height='30%'
				maxHeight='60px'
				width='100%'
				maxwidth='200px'
			/>
		</View>
	);
}

function ToolCardLogoImage ({ position, src, alt }) {
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
				height='48px'
			/>
		</View>
	);
}


function ToolCard ({ position, heading, content, src_logo, src_bg, handleToolSelected }) {
	return (
		<View {...position}
			maxWidth='280px'
			borderWidth='thin'
			borderRadius='small'
			borderColor='gray-50'
			overflow='hidden'
		>
			<View position='relative'>
				<ToolCardLogoImage
					position={{position:'absolute', bottom:'-10px', left:'10px'}}
					src={src_logo}
					alt={heading + '_logo'}
				/>
				<ToolCardBackgroundImage
					src={src_bg}
					alt={heading + '_bg'}
				/>
			</View>
			<Heading marginStart='10px'>{heading}</Heading>
			<Content marginStart='10px' marginBottom='10px'>{content}</Content>
			<Button value={heading} onPress={(event) => handleToolSelected(heading)}>
				OPEN
			</Button>
		</View>
	);
}

function ToolCardCollection ({ position, handleToolSelected }) {
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
				<ToolCard
					//position = {position: 'absolute'}
					//top = '100px'
					src_logo={assignCardLogo}
					src_bg={assignCardBg}
					heading='assign.tool'
					content='Assign players to roles for sections.'
					handleToolSelected={handleToolSelected}
				/>
			</View>
			<View gridArea="upper-middle">
				<ToolCard
					src_logo={crawlerCardLogo}
					src_bg={crawlerCardBg}
					heading='crawler.tool'
					content='Survey site structures.'
					handleToolSelected={handleToolSelected}
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


function Toolbox( {handleToolSelected} ) {
	handleToolSelected("toolbox");

    return (
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
				<Hero src={LOGO}/>	
			</Grid>
			</View>
			<View backgroundColor="gray-50" gridArea="content">
			<Grid
			height='100%'
			justifyContent='center'
			>
				<ToolCardCollection handleToolSelected={handleToolSelected}/>
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
  );
}

export default Toolbox;
