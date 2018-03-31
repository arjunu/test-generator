const code =
`import {HTMLColors} from '../constants/color';
import {REGEX_HEX_COLOR} from '../constants/regex';

/**
 *
 * @param {number} color
 * @returns {boolean}
 * @test red->true
 * @test undefined->false
 * @test ''->false
 */
export const isValidHTMLColor = color => HTMLColors.includes(color) || REGEX_HEX_COLOR.test(color.toLowerCase());
`;

export default code;