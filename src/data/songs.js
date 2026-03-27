// Key reference — keys stored uppercase for display; comparison is case-insensitive.
// At octave=1: Q=C2 W=D2 E=E2 R=F2 T=G2 Y=A2 U=B2  Z=C3 X=D3 C=E3 V=F3 B=G3 N=A3 M=B3
//              6=C#2 7=D#2 8=F#2 9=G#2 0=A#2
// At octave=2: A=C2 S=D2 D=E2 F=F2 G=G2 H=A2 J=B2  Q=C3 W=D3 E=E3 R=F3 T=G3 Y=A3 U=B3
//              1=C#2 2=D#2 3=F#2 4=G#2 5=A#2

export const SONGS = [
  // ── Pakistani ──────────────────────────────────────────────────────────────
  {
    id: 'pakistan-anthem',
    title: 'Qaumi Tarana',
    artist: 'Pakistan National Anthem',
    // Transposed to C major (original Eb major): Eb→C F→D G→E Ab→F Bb→G C→A D→B
    settings: { octave: 1, volume: 85, reverb: 55, sustain: false },
    lines: [
      // Pak sar-za-min shaad baad  (Bb Bb C Bb G F → G G A G E D)
      ['T', 'T', 'Y', 'T', 'E', 'W'],
      // Kishwar-e-haseen shaad baad  (G F Eb F G Bb G → E D C D E G E)
      ['E', 'W', 'Q', 'W', 'E', 'T', 'E'],
      // Tu nishaan-e-azm-e-aali shaan  (G G Ab G F Eb F G Bb → E E F E D C D E G)
      ['E', 'E', 'R', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // Arze Pakistan  (Bb G Eb → G E C)
      ['T', 'E', 'Q'],
      // — second pass —
      ['T', 'T', 'Y', 'T', 'E', 'W'],
      ['E', 'W', 'Q', 'W', 'E', 'T', 'E'],
      ['E', 'E', 'R', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // Markaz-e-yaqeen shaad baad  (same as line 2)
      ['E', 'W', 'Q', 'W', 'E', 'T', 'E'],
      // Paindah taabindah baad  (rising phrase Eb F G Ab Bb → C D E F G)
      ['Q', 'W', 'E', 'R', 'T'],
      // Final resolution  (Bb G F Eb → G E D C)
      ['T', 'E', 'W', 'Q'],
    ],
  },
  {
    id: 'dil-dil-pakistan',
    title: 'Dil Dil Pakistan',
    artist: 'Vital Signs',
    // Main hook and verse melody in C major
    settings: { octave: 1, volume: 80, reverb: 30, sustain: false },
    lines: [
      // Dil Dil Pakistan  (E E G A G E)
      ['E', 'E', 'T', 'Y', 'T', 'E'],
      // Jaan Jaan Pakistan  (E G A B A G)
      ['E', 'T', 'Y', 'U', 'Y', 'T'],
      // Descending resolve  (G G A G E D C)
      ['T', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Verse phrase  (C D E G E D C)
      ['Q', 'W', 'E', 'T', 'E', 'W', 'Q'],
      // Dil Dil Pakistan (repeat)
      ['E', 'E', 'T', 'Y', 'T', 'E'],
      // Jaan Jaan Pakistan (repeat)
      ['E', 'T', 'Y', 'U', 'Y', 'T'],
      // Ascending phrase  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Descend back  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Dil Dil Pakistan (final)
      ['E', 'E', 'T', 'Y', 'T', 'E'],
      // End on tonic
      ['E', 'T', 'Y', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'sohni-dharti',
    title: 'Sohni Dharti',
    artist: 'Traditional Patriotic',
    // Melody in C major
    settings: { octave: 1, volume: 80, reverb: 45, sustain: true },
    lines: [
      // Sohni dharti Allah rakhay  (C E G G A G E D C)
      ['Q', 'E', 'T', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Zeher na lagay koyi  (C E G A G E C)
      ['Q', 'E', 'T', 'Y', 'T', 'E', 'Q'],
      // Rising phrase  (D E G A B C')
      ['W', 'E', 'T', 'Y', 'U', 'Z'],
      // Descend  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Sohni dharti (repeat)
      ['Q', 'E', 'T', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Second phrase  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Bridge  (E G A B A G E D)
      ['E', 'T', 'Y', 'U', 'Y', 'T', 'E', 'W'],
      // Final resolve  (C E G G E C)
      ['Q', 'E', 'T', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'jazba-junoon',
    title: 'Jazba Junoon',
    artist: 'Strings',
    // From Khamoshi — main melodic theme
    settings: { octave: 1, volume: 82, reverb: 35, sustain: false },
    lines: [
      // Main riff  (E D E G A G E D)
      ['E', 'W', 'E', 'T', 'Y', 'T', 'E', 'W'],
      // Response  (C D E G E D C)
      ['Q', 'W', 'E', 'T', 'E', 'W', 'Q'],
      // Rising  (E G A B A G E)
      ['E', 'T', 'Y', 'U', 'Y', 'T', 'E'],
      // Verse phrase  (G G A G E D C)
      ['T', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Main riff repeat
      ['E', 'W', 'E', 'T', 'Y', 'T', 'E', 'W'],
      // Ascending run  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Descend  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Final phrase  (E D E G E C)
      ['E', 'W', 'E', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'duur',
    title: 'Duur',
    artist: 'Strings',
    // Melancholic ballad — main vocal melody
    settings: { octave: 1, volume: 75, reverb: 50, sustain: true },
    lines: [
      // Opening phrase  (G A G E D C)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
      // Response  (C D E G A G)
      ['Q', 'W', 'E', 'T', 'Y', 'T'],
      // Higher phrase  (G B A G E D)
      ['T', 'U', 'Y', 'T', 'E', 'W'],
      // Resolve  (D E G A G E C)
      ['W', 'E', 'T', 'Y', 'T', 'E', 'Q'],
      // Second verse  (G A G E D C)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
      // Ascending  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Peak and descend  (C' B A G E D)
      ['Z', 'U', 'Y', 'T', 'E', 'W'],
      // Final resolve  (D E G A G E C)
      ['W', 'E', 'T', 'Y', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'tere-bina',
    title: 'Tere Bina',
    artist: 'Atif Aslam',
    // A minor — main vocal melody
    settings: { octave: 1, volume: 75, reverb: 55, sustain: true },
    lines: [
      // Tere bina main nahin  (A B C' D' C' B A)
      ['Y', 'U', 'Z', 'X', 'Z', 'U', 'Y'],
      // Descend  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Rising phrase  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Coming back  (C' B A G E)
      ['Z', 'U', 'Y', 'T', 'E'],
      // Tere bina (repeat)
      ['Y', 'U', 'Z', 'X', 'Z', 'U', 'Y'],
      // Bridge  (E G A B A G E D)
      ['E', 'T', 'Y', 'U', 'Y', 'T', 'E', 'W'],
      // Verse  (A G A B C' B A)
      ['Y', 'T', 'Y', 'U', 'Z', 'U', 'Y'],
      // Final resolve  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
    ],
  },
  {
    id: 'woh-lamhe',
    title: 'Woh Lamhe',
    artist: 'Atif Aslam',
    // Main vocal melody
    settings: { octave: 1, volume: 78, reverb: 50, sustain: true },
    lines: [
      // Woh lamhe woh baatein  (E G A G E D C)
      ['E', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Woh khwab chahiye  (C D E G E D)
      ['Q', 'W', 'E', 'T', 'E', 'W'],
      // Higher  (E G A B A G)
      ['E', 'T', 'Y', 'U', 'Y', 'T'],
      // Descend  (G A G E D C)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
      // Woh lamhe (repeat)
      ['E', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Ascending run  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Peak  (C' B A G E D)
      ['Z', 'U', 'Y', 'T', 'E', 'W'],
      // Final  (D E G A G E C)
      ['W', 'E', 'T', 'Y', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'teri-meri-kahaani',
    title: 'Teri Meri Kahaani',
    artist: 'Rahat Fateh Ali Khan',
    // Main melody
    settings: { octave: 1, volume: 78, reverb: 55, sustain: true },
    lines: [
      // Teri meri kahaani  (E G A G E D C)
      ['E', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Ho gayi hai yahan  (C D E G A G)
      ['Q', 'W', 'E', 'T', 'Y', 'T'],
      // Judaa judaa  (G A B A G E)
      ['T', 'Y', 'U', 'Y', 'T', 'E'],
      // Resolve  (E D E G E C)
      ['E', 'W', 'E', 'T', 'E', 'Q'],
      // Teri meri (repeat)
      ['E', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Rising  (C E G A B C')
      ['Q', 'E', 'T', 'Y', 'U', 'Z'],
      // Descend  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Final phrase  (E G A G E C)
      ['E', 'T', 'Y', 'T', 'E', 'Q'],
    ],
  },
  // ── Bollywood ──────────────────────────────────────────────────────────────
  {
    id: 'tum-hi-ho',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh · Aashiqui 2',
    // A minor — same notes as C major (no sharps needed)
    // A=Y B=U C=Z(C3) or Q(C2) D=W or X E=E F=R G=T
    settings: { octave: 1, volume: 80, reverb: 55, sustain: true },
    lines: [
      // Hum tere bin ab reh nahin sakte  (A A G A B C' B A)
      ['Y', 'Y', 'T', 'Y', 'U', 'Z', 'U', 'Y'],
      // Tere bina kya wajood mera  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Ab toh tumse har khushi  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Hum tere bin (repeat)
      ['Y', 'Y', 'T', 'Y', 'U', 'Z', 'U', 'Y'],
      // Chorus: Tum hi ho  (E D C D E A)
      ['E', 'W', 'Q', 'W', 'E', 'Y'],
      // Aashiqui hai tum  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Ab mera jeena  (A B C' B A G)
      ['Y', 'U', 'Z', 'U', 'Y', 'T'],
      // Tum hi ho (repeat)
      ['E', 'W', 'Q', 'W', 'E', 'Y'],
      // Tum hi ho (high)  (A B C' D' C' B A)
      ['Y', 'U', 'Z', 'X', 'Z', 'U', 'Y'],
      // Final resolve  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
    ],
  },
  {
    id: 'kal-ho-na-ho',
    title: 'Kal Ho Na Ho',
    artist: 'Sonu Nigam',
    // Bb major → transposed to C major (Bb→C C→D D→E Eb→F F→G G→A A→B Bb→C)
    settings: { octave: 1, volume: 80, reverb: 50, sustain: true },
    lines: [
      // Har ghadi badal rahi hai  (C C D C A G A)
      ['Q', 'Q', 'W', 'Q', 'Y', 'T', 'Y'],
      // Roop zindagi  (C C D E F E D)
      ['Q', 'Q', 'W', 'E', 'R', 'E', 'W'],
      // Seene mein jalan  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Aankhon mein toofan  (E D C D E G)
      ['E', 'W', 'Q', 'W', 'E', 'T'],
      // Kal ho na ho  (G A G E D C)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
      // Hasi (rising)  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Peak and descend  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Kal ho na ho (repeat)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
      // Har ghadi (repeat)
      ['Q', 'Q', 'W', 'Q', 'Y', 'T', 'Y'],
      // Final resolve
      ['Q', 'W', 'E', 'T', 'E', 'W', 'Q'],
    ],
  },
  {
    id: 'tujh-mein-rab',
    title: 'Tujh Mein Rab Dikhta Hai',
    artist: 'Roop Kumar Rathod',
    // G major → C major transposition (G→C A→D B→E C→F D→G E→A F#→B G→C')
    settings: { octave: 1, volume: 78, reverb: 60, sustain: true },
    lines: [
      // Tujh mein rab dikhta hai  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Yaara main kya karoon  (E D C D E G)
      ['E', 'W', 'Q', 'W', 'E', 'T'],
      // Tujh mein rab (repeat)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Dikhta hai  (G A G E C)
      ['T', 'Y', 'T', 'E', 'Q'],
      // Rising phrase  (C E G A B C')
      ['Q', 'E', 'T', 'Y', 'U', 'Z'],
      // Descend  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Tujh mein (final)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Resolve  (E D C)
      ['E', 'W', 'Q'],
    ],
  },
  {
    id: 'lag-ja-gale',
    title: 'Lag Ja Gale',
    artist: 'Lata Mangeshkar',
    // G major → C major
    settings: { octave: 1, volume: 75, reverb: 65, sustain: true },
    lines: [
      // Lag ja gale se phir  (G A G E D C D E G)
      ['T', 'Y', 'T', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // Haseen raat ho na ho  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Shayad phir is janam mein  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Mulaqat ho na ho  (C' B A G E D C)
      ['Z', 'U', 'Y', 'T', 'E', 'W', 'Q'],
      // Lag ja gale (repeat)
      ['T', 'Y', 'T', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // Se phir  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Antara phrase  (G A B A G E D)
      ['T', 'Y', 'U', 'Y', 'T', 'E', 'W'],
      // (E G A G E C)
      ['E', 'T', 'Y', 'T', 'E', 'Q'],
      // Final lag ja gale
      ['T', 'Y', 'T', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // Ending resolve  (A G E C)
      ['Y', 'T', 'E', 'Q'],
    ],
  },
  {
    id: 'ae-dil-hai-mushkil',
    title: 'Ae Dil Hai Mushkil',
    artist: 'Arijit Singh',
    // A minor melody
    settings: { octave: 1, volume: 78, reverb: 55, sustain: true },
    lines: [
      // Ae dil hai mushkil  (A A G F# G A)
      ['Y', 'Y', 'T', '8', 'T', 'Y'],
      // Jeena yahan  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Zara sa aasmaan de  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Ae dil hai mushkil (repeat)
      ['Y', 'Y', 'T', '8', 'T', 'Y'],
      // Aashiqui meri  (A B C' B A G E)
      ['Y', 'U', 'Z', 'U', 'Y', 'T', 'E'],
      // Jeena yahan  (A G E D C)
      ['Y', 'T', 'E', 'W', 'Q'],
      // Rising  (C D E G A B C')
      ['Q', 'W', 'E', 'T', 'Y', 'U', 'Z'],
      // Final descend  (C' B A G F# G A)
      ['Z', 'U', 'Y', 'T', '8', 'T', 'Y'],
    ],
  },
  // ── International ──────────────────────────────────────────────────────────
  {
    id: 'happy-birthday',
    title: 'Happy Birthday',
    artist: 'Traditional',
    settings: { octave: 1, volume: 70, reverb: 30, sustain: false },
    lines: [
      ['Q', 'Q', 'W', 'Q', 'R', 'E'],
      ['Q', 'Q', 'W', 'Q', 'T', 'R'],
      ['Q', 'Q', 'Z', 'Y', 'R', 'E', 'W'],
      ['0', '0', 'Y', 'R', 'T', 'R'],
    ],
  },
  {
    id: 'twinkle-twinkle',
    title: 'Twinkle Twinkle Little Star',
    artist: 'Traditional',
    settings: { octave: 1, volume: 70, reverb: 25, sustain: false },
    lines: [
      ['Q', 'Q', 'T', 'T', 'Y', 'Y', 'T'],
      ['R', 'R', 'E', 'E', 'W', 'W', 'Q'],
      ['T', 'T', 'R', 'R', 'E', 'E', 'W'],
      ['T', 'T', 'R', 'R', 'E', 'E', 'W'],
      ['Q', 'Q', 'T', 'T', 'Y', 'Y', 'T'],
      ['R', 'R', 'E', 'E', 'W', 'W', 'Q'],
    ],
  },
  {
    id: 'fur-elise',
    title: 'Für Elise',
    artist: 'Beethoven',
    // At octave=2: A=C2 S=D2 D=E2 G=G2 H=A2 J=B2 | 2=D#2 4=G#2
    settings: { octave: 2, volume: 72, reverb: 65, sustain: false },
    lines: [
      // Main theme: E D# E D# E B D C A
      ['D', '2', 'D', '2', 'D', 'J', 'S', 'A', 'H'],
      // Response: C E A B
      ['A', 'D', 'H', 'J'],
      // Ascending: E G# B C
      ['D', '4', 'J', 'A'],
      // Main theme repeat
      ['D', '2', 'D', '2', 'D', 'J', 'S', 'A', 'H'],
      ['A', 'D', 'H', 'J'],
      ['D', '4', 'J', 'A'],
      // Main theme third time
      ['D', '2', 'D', '2', 'D', 'J', 'S', 'A', 'H'],
      // Longer response with descent: C E A B E D C
      ['A', 'D', 'H', 'J', 'D', 'S', 'A'],
      // Ending cadence: A E A (resolution)
      ['H', 'D', 'H'],
    ],
  },
  {
    id: 'canon-in-d',
    title: 'Canon in D',
    artist: 'Pachelbel',
    // Actual D major notes: F#=8 E=E D=W C#=6 G=T A=Y B=U
    settings: { octave: 1, volume: 72, reverb: 70, sustain: true },
    lines: [
      // F# E D D
      ['8', 'E', 'W', 'W'],
      // F# E D C#
      ['8', 'E', 'W', '6'],
      // B A B C#
      ['U', 'Y', 'U', '6'],
      // D E F# G
      ['W', 'E', '8', 'T'],
      // A G F# E
      ['Y', 'T', '8', 'E'],
      // F# G A A
      ['8', 'T', 'Y', 'Y'],
      // F# E D C#
      ['8', 'E', 'W', '6'],
      // B C# D E
      ['U', '6', 'W', 'E'],
      // F# G F# E D E D C#
      ['8', 'T', '8', 'E', 'W', 'E', 'W', '6'],
      // B A G F# E D C#
      ['U', 'Y', 'T', '8', 'E', 'W', '6'],
    ],
  },
  {
    id: 'someone-like-you',
    title: 'Someone Like You',
    artist: 'Adele',
    // A major: A=Y B=U C#=6 D=W E=E F#=8 G#=9
    settings: { octave: 1, volume: 78, reverb: 50, sustain: true },
    lines: [
      // Verse: I heard that you're settled down  (A B C# D C# B A)
      ['Y', 'U', '6', 'W', '6', 'U', 'Y'],
      // That you found a girl  (B C# D E D C#)
      ['U', '6', 'W', 'E', 'W', '6'],
      // And now you're married  (B A G# F# E)
      ['U', 'Y', '9', '8', 'E'],
      // Never mind I'll find  (A G# A B A)
      ['Y', '9', 'Y', 'U', 'Y'],
      // Chorus: Someone like you  (C# D C# B A)
      ['6', 'W', '6', 'U', 'Y'],
      // I wish nothing but the best  (A B C# D E)
      ['Y', 'U', '6', 'W', 'E'],
      // For you too  (E D C# B A)
      ['E', 'W', '6', 'U', 'Y'],
      // Don't forget me I beg  (A G# A B C# D)
      ['Y', '9', 'Y', 'U', '6', 'W'],
      // I remember you said  (C# B A G# F# E)
      ['6', 'U', 'Y', '9', '8', 'E'],
      // Sometimes it lasts in love  (A B C# D E D C# B A)
      ['Y', 'U', '6', 'W', 'E', 'W', '6', 'U', 'Y'],
    ],
  },
  {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    // G major → C major transposition (G→C A→D B→E C→F D→G E→A F#→B)
    settings: { octave: 1, volume: 78, reverb: 50, sustain: true },
    lines: [
      // I found a love for me  (E E E D C E F G)
      ['E', 'E', 'E', 'W', 'Q', 'E', 'R', 'T'],
      // Darling just dive right in  (G F E D C)
      ['T', 'R', 'E', 'W', 'Q'],
      // And let the waters rise  (E E D C D E G)
      ['E', 'E', 'W', 'Q', 'W', 'E', 'T'],
      // I wasn't scared of the dark  (G G G A B C' B A G)
      ['T', 'T', 'T', 'Y', 'U', 'Z', 'U', 'Y', 'T'],
      // I found a love (repeat)
      ['E', 'E', 'E', 'W', 'Q', 'E', 'R', 'T'],
      // To carry more than just my secrets  (G F E D C D E)
      ['T', 'R', 'E', 'W', 'Q', 'W', 'E'],
      // Chorus: We were just kids in love  (E G A G E D C)
      ['E', 'T', 'Y', 'T', 'E', 'W', 'Q'],
      // Darling you look perfect tonight  (C D E G A G E)
      ['Q', 'W', 'E', 'T', 'Y', 'T', 'E'],
      // Well I found a woman  (E E E D C E R T)
      ['E', 'E', 'E', 'W', 'Q', 'E', 'R', 'T'],
      // Final resolve  (G A G E D C)
      ['T', 'Y', 'T', 'E', 'W', 'Q'],
    ],
  },
  {
    id: 'jingle-bells',
    title: 'Jingle Bells',
    artist: 'Traditional',
    settings: { octave: 1, volume: 80, reverb: 35, sustain: false },
    lines: [
      // Verse: Dashing through the snow  (G G G G G)
      ['T', 'T', 'T', 'T', 'T'],
      // In a one-horse open sleigh  (T E Q W T)
      ['T', 'E', 'Q', 'W', 'T'],
      // O'er the fields we go  (Y Y Y Y Y)
      ['Y', 'Y', 'Y', 'Y', 'Y'],
      // Laughing all the way  (Y T T T T)
      ['Y', 'T', 'T', 'T', 'T'],
      // Chorus: Jingle bells jingle bells
      ['E', 'E', 'E'],
      ['E', 'E', 'E'],
      // Jingle all the way  (E G C D E)
      ['E', 'T', 'Q', 'W', 'E'],
      // Oh what fun it is to ride
      ['R', 'R', 'R', 'R'],
      ['R', 'E', 'E', 'E'],
      // In a one-horse open sleigh  (E D D E D G)
      ['E', 'W', 'W', 'E', 'W', 'T'],
    ],
  },
]
