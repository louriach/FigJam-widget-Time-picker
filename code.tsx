const { widget } = figma;
const { AutoLayout, Text, SVG, useSyncedState } = widget;

type DateFormat = 
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'Month DD, YYYY'
  | 'DD Month YYYY'
  | 'MMM DD, YYYY';

type DayFormat = 
  | 'Hidden'
  | 'Short'
  | 'Medium'
  | 'Long';

function DateWidget() {
  const [dateFormat, setDateFormat] = useSyncedState<DateFormat>('dateFormat', 'MM/DD/YYYY');
  const [dayFormat, setDayFormat] = useSyncedState<DayFormat>('dayFormat', 'Long');
  const [isMenuOpen, setIsMenuOpen] = useSyncedState<boolean>('isMenuOpen', false);
  const [widgetColor, setWidgetColor] = useSyncedState<string>('widgetColor', '#FFFFFF');

  function formatDate(date: Date, format: DateFormat): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    switch (format) {
      case 'MM/DD/YYYY':
        return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
      case 'DD/MM/YYYY':
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      case 'Month DD, YYYY':
        return `${monthNames[month - 1]} ${day}, ${year}`;
      case 'DD Month YYYY':
        return `${day} ${monthNames[month - 1]} ${year}`;
      case 'MMM DD, YYYY':
        return `${monthNamesShort[month - 1]} ${day}, ${year}`;
      default:
        return `${month}/${day}/${year}`;
    }
  }

  function getDayOfWeek(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  function formatDayOfWeek(date: Date, format: DayFormat): string {
    const fullDay = getDayOfWeek(date);
    
    switch (format) {
      case 'Hidden':
        return '';
      case 'Short':
        return fullDay.charAt(0); // First letter: S, M, T, W, T, F, S
      case 'Medium':
        return fullDay.substring(0, 3); // Three letters: Sun, Mon, Tue, etc.
      case 'Long':
        return fullDay; // Full: Sunday, Monday, etc.
      default:
        return fullDay;
    }
  }

  const now = new Date();
  const today = formatDate(now, dateFormat);
  const dayOfWeek = formatDayOfWeek(now, dayFormat);

  const dayFormats: DayFormat[] = ['Hidden', 'Short', 'Medium', 'Long'];

  const formats: DateFormat[] = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'Month DD, YYYY',
    'DD Month YYYY',
    'MMM DD, YYYY'
  ];

  const colors = [
    { name: 'White', value: '#FFFFFF', text: '#1A1A1A', border: '#5C5C5C' },
    { name: 'Light Gray', value: '#E5E5E5', text: '#4A4A4A', border: '#707070' },
    { name: 'Coral', value: '#FFCFCA', text: '#B32100', border: '#EE6C4D' },
    { name: 'Peach', value: '#FFE4CC', text: '#A34F00', border: '#F8A66F' },
    { name: 'Yellow', value: '#FFF4CC', text: '#8C6400', border: '#F9D472' },
    { name: 'Green', value: '#D4F6D4', text: '#117A1F', border: '#8FD694' },
    { name: 'Teal', value: '#D0F4EE', text: '#0C7A70', border: '#7DD3C0' },
    { name: 'Blue', value: '#D9EDFF', text: '#0065B0', border: '#6DB9F5' },
    { name: 'Purple', value: '#E8DEFF', text: '#6831DF', border: '#A78BFA' },
    { name: 'Pink', value: '#FFE0F5', text: '#AD0E7B', border: '#F687D4' },
  ];

  const currentColor = colors.find(c => c.value === widgetColor) || colors[0];
  const textColor = currentColor.text;
  const borderColor = currentColor.border;

  const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${textColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`;

  return (
    <AutoLayout
      direction="vertical"
      spacing={0}
      cornerRadius={16}
      fill={widgetColor}
      stroke={borderColor}
      strokeWidth={3}
      width={isMenuOpen ? 400 : 'hug-contents'}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        blur: 8,
      }}
    >
      {/* Main Date Display */}
      <AutoLayout
        direction="horizontal"
        spacing={6}
        padding={{ vertical: 16, horizontal: 16 }}
        verticalAlignItems="center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        fill={widgetColor}
      >
        <SVG src={calendarIcon} />
        <AutoLayout
          direction="horizontal"
          spacing={2}
        >
          {dayOfWeek !== '' && (
            <>
              <Text
                fontSize={14}
                fill={textColor}
              >
                {dayOfWeek},
              </Text>
            </>
          )}
          <Text
            fontSize={14}
            fontWeight={600}
            fill={textColor}
          >
            {today}
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Settings Menu */}
      {isMenuOpen && (
        <AutoLayout
          direction="vertical"
          spacing={0}
          width="fill-parent"
          stroke={borderColor}
          strokeWidth={1}
        >
          {/* Date and Day Formats - Two Column Layout */}
          <AutoLayout
            direction="horizontal"
            spacing={0}
            width="fill-parent"
            fill={'#ffffff'}
          >
            {/* Date Format Column */}
            <AutoLayout
              direction="vertical"
              spacing={0}
              width="fill-parent"
            >
              <AutoLayout
                padding={{ top: 16, bottom: 8, horizontal: 16 }}
                width="fill-parent"
              >
                <Text
                  fontSize={11}
                  fontWeight={600}
                  fill="#666666"
                >
                  DATE FORMAT
                </Text>
              </AutoLayout>
              
              {formats.map((format) => (
                <AutoLayout
                  key={format}
                  direction="horizontal"
                  spacing={8}
                  padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
                  width="fill-parent"
                  onClick={() => {
                    setDateFormat(format);
                  }}
                  fill={'#FFFFFF'}
                  hoverStyle={{
                    fill: '#F5F5F5',
                  }}
                >
                  <AutoLayout
                    direction="vertical"
                    spacing={2}
                    width="fill-parent"
                  >
                    <Text
                      fontSize={14}
                      fill="#000000"
                    >
                      {format}
                    </Text>
                    <Text
                      fontSize={12}
                      fill="#999999"
                    >
                      {formatDate(new Date(), format)}
                    </Text>
                  </AutoLayout>
                  <Text
                    fontSize={13}
                    fill={dateFormat === format ? '#000000' : '#ffffff'}
                    fontWeight={600}
                  >
                    ✓
                  </Text>
                </AutoLayout>
              ))}
            </AutoLayout>

            {/* Divider */}
            <AutoLayout
              width={1}
              height="fill-parent"
              fill={borderColor}
            />

            {/* Day Format Column */}
            <AutoLayout
              direction="vertical"
              spacing={0}
              width="fill-parent"
            >
              <AutoLayout
                padding={{ top: 16, bottom: 8, horizontal: 16 }}
                width="fill-parent"
              >
                <Text
                  fontSize={11}
                  fontWeight={600}
                  fill="#666666"
                >
                  DAY FORMAT
                </Text>
              </AutoLayout>
              
              {dayFormats.map((format) => (
                <AutoLayout
                  key={format}
                  direction="horizontal"
                  spacing={8}
                  padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
                  width="fill-parent"
                  onClick={() => {
                    setDayFormat(format);
                  }}
                  fill={'#FFFFFF'}
                  hoverStyle={{
                    fill: '#F5F5F5',
                  }}
                >
                  <AutoLayout
                    direction="vertical"
                    spacing={2}
                    width="fill-parent"
                  >
                    <Text
                      fontSize={14}
                      fill="#000000"
                    >
                      {format}
                    </Text>
                    <Text
                      fontSize={12}
                      fill="#999999"
                    >
                      {formatDayOfWeek(new Date(), format) || '(hidden)'}
                    </Text>
                  </AutoLayout>
                  <Text
                    fontSize={13}
                    fill={dayFormat === format ? '#000000' : '#ffffff'}
                    fontWeight={600}
                  >
                    ✓
                  </Text>
                </AutoLayout>
              ))}
            </AutoLayout>
          </AutoLayout>

          {/* Color Section */}
          <AutoLayout
            direction="vertical"
            spacing={0}
            width="fill-parent"
            fill={'#ffffff'}
            stroke={borderColor}
            strokeWidth={1}
          >
            <AutoLayout
              padding={{ vertical: 12, horizontal: 16 }}
              width="fill-parent"
            >
              <Text
                fontSize={11}
                fontWeight={600}
                fill="#666666"
              >
                COLOR
              </Text>
            </AutoLayout>
            
            <AutoLayout
              direction="vertical"
              spacing={6}
              padding={{ top: 0, bottom: 16, horizontal: 16 }}
              width="fill-parent"
            >
              {/* First row - colors 0-4 */}
              <AutoLayout
                direction="horizontal"
                spacing={6}
                width="fill-parent"
              >
                {colors.slice(0, 5).map((color) => (
                  <AutoLayout
                    key={color.value}
                    width="fill-parent"
                    height={40}
                    cornerRadius={8}
                    fill={color.value}
                    stroke={color.border}
                    strokeWidth={widgetColor === color.value ? 2 : 1}
                    onClick={() => setWidgetColor(color.value)}
                    hoverStyle={{
                      stroke: color.border,
                    }}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                  >
                    {widgetColor === color.value && (
                      <Text
                        fontSize={16}
                        fontWeight={700}
                        fill={color.text}
                      >
                        ✓
                      </Text>
                    )}
                  </AutoLayout>
                ))}
              </AutoLayout>
              
              {/* Second row - colors 5-9 */}
              <AutoLayout
                direction="horizontal"
                spacing={6}
                width="fill-parent"
              >
                {colors.slice(5, 10).map((color) => (
                  <AutoLayout
                    key={color.value}
                    width="fill-parent"
                    height={40}
                    cornerRadius={8}
                    fill={color.value}
                    stroke={color.border}
                    strokeWidth={widgetColor === color.value ? 2 : 1}
                    onClick={() => setWidgetColor(color.value)}
                    hoverStyle={{
                      stroke: color.border,
                    }}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                  >
                    {widgetColor === color.value && (
                      <Text
                        fontSize={16}
                        fontWeight={700}
                        fill={color.text}
                      >
                        ✓
                      </Text>
                    )}
                  </AutoLayout>
                ))}
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>

          {/* Minimize Button */}
          <AutoLayout fill={'#ffffff'} padding={{ horizontal: 16, vertical: 16 }} width="fill-parent">
            <AutoLayout
              width="fill-parent"
              padding={{ vertical: 12, horizontal: 16 }}
              fill={widgetColor}
              cornerRadius={8}
              stroke={borderColor}
              strokeWidth={2}
              onClick={() => setIsMenuOpen(false)}
              hoverStyle={{
                fill: widgetColor,
              }}
              horizontalAlignItems="center"
            >
              <Text
                fontSize={12}
                fontWeight={600}
                fill={textColor}
              >
                Minimize widget
              </Text>
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(DateWidget);

