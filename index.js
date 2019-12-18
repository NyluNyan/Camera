const fs = require('fs'),
path = require('path');

module.exports = function AutoCamera(mod) {
	
	let config = require('./config.json');
	
	mod.command.add('cam', cmd =>
	{
		if(!isNaN(cmd))
		{
			Set(cmd);
			config.distance = cmd;
			mod.command.message('distance set to: ' + cmd);
		}
		else
		{
			config.enable=!config.enable;
			mod.command.message('camera distance ' + (config.enable ? 'en' : 'dis') + 'abled');
		}
		fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(config));
	});
	
	mod.game.on('leave_loading_screen', () => {
        if(config.enable) Set(config.distance);
    });

	function Set(distance)
	{
		mod.toClient('S_DUNGEON_CAMERA_SET', 1, {
			enabled: true,
			default: Math.floor(distance/1.5),
			max: distance
		});
	}
}