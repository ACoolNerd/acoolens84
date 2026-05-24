// ACCESSFriendly LA28 Master Script

// Global state
let allEvents = [];
let currentLanguage = 'en';
let activeCompanion = 'noah';
let elevatorOutageActive = false;
let currentSlideIndex = 0;

// Language Dictionaries
const i18n = {
    en: {
        nav_home: "Dashboard Home",
        nav_events: "Master Schedule",
        nav_transit: "Transit Router",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "Startup Deck",
        select_language: "Language",
        user_role: "Sovereign Founder",
        home_title: "Ecosystem Command",
        home_subtitle: "Elevating the San Fernando Valley and greater Los Angeles to the world.",
        stat_events: "Total Events",
        stat_events_sub: "Synchronized from Alain Rosas' Master Registry",
        stat_accessibility: "ACCESSFriendly",
        stat_accessibility_sub: "Step-Free, Elevator-Audited & Level-Boarding",
        stat_budget: "Budget Games",
        stat_budget_sub: "Sessions with under $28 tickets available",
        companion_title: "Interactive Logistics Companions",
        companion_desc: "Select a local guide or global sporting star to provide real-time paratransit directions and Olympic commentary.",
        diagnostics_title: "Sovereign Layer Diagnostics",
        events_title: "LA28 Master Scheduler",
        events_subtitle: "Search, filter, and plan matches across 845 events and 52 venues.",
        filter_under_28: "Under $28 Tickets",
        transit_title: "ACCESSFriendly Transit Router",
        transit_subtitle: "MTA Subway, Light Rail, and G/J Busway scheduling simulator for wheelchair boarding.",
        router_origin: "Starting Hub",
        router_destination: "Olympic Destination Venue",
        calculate_route: "Calculate Step-Free Route",
        outage_simulator_title: "Elevator Outage Simulation",
        outage_simulator_desc: "Simulate a local elevator breakdown at a crucial MTA transfer station to verify paratransit auto-rerouting.",
        simulate_outage: "Simulate Station Outage",
        route_directions: "Step-by-Step Directions",
        hud_title: "LA84 Lens AR Telemetry",
        hud_subtitle: "Virtual heads-up display showcasing real-time coordinates, grade slopes, and seat price charts.",
        gesture_controls_title: "Simulated Gesture Commands",
        gesture_controls_desc: "Interact with the glasses HUD using emulated coordinate movements and hand gestures.",
        gesture_pinch: "Pinch (Pin Target Venue)",
        gesture_swipe: "Swipe (Toggle Metrics Overlay)",
        gesture_wave: "Wave (Dismiss Live Alerts)",
        telemetry_modifier_title: "HUD Stream Overrides",
        set_venue_focus: "Focus Target Venue",
        density_label: "Simulate Density",
        pitch_title: "Google for Startups Presentation",
        pitch_subtitle: "A professional funding presentation and nonprofit grant application outline built for the Google Cloud Studio suite."
    },
    es: {
        nav_home: "Inicio del Panel",
        nav_events: "Calendario Maestro",
        nav_transit: "Rutas de Tránsito",
        nav_hud: "AR HUD LA84",
        nav_pitch: "Presentación Startup",
        select_language: "Idioma",
        user_role: "Fundador Soberano",
        home_title: "Comando del Ecosistema",
        home_subtitle: "Elevando el Valle de San Fernando y el gran Los Ángeles al mundo entero.",
        stat_events: "Eventos Totales",
        stat_events_sub: "Sincronizado del registro maestro de Alain Rosas",
        stat_accessibility: "ACCESSFriendly",
        stat_accessibility_sub: "Sin escalones, ascensores auditados y embarque nivelado",
        stat_budget: "Juegos Económicos",
        stat_budget_sub: "Sesiones con boletos disponibles por menos de $28",
        companion_title: "Acompañantes de Logística Interactiva",
        companion_desc: "Seleccione un guía local o estrella deportiva mundial para obtener direcciones de paratránsito en tiempo real.",
        diagnostics_title: "Diagnósticos de Capa Soberana",
        events_title: "Programador Maestro LA28",
        events_subtitle: "Busque, filtre y planifique partidos en 845 eventos y 52 sedes.",
        filter_under_28: "Boletos de menos de $28",
        transit_title: "Enrutador de Tránsito ACCESSFriendly",
        transit_subtitle: "Simulador de horarios de metro, tren ligero y autobús de tránsito MTA para abordar sillas de ruedas.",
        router_origin: "Punto de Partida",
        router_destination: "Sede de Destino Olímpico",
        calculate_route: "Calcular Ruta Accesible",
        outage_simulator_title: "Simulación de Interrupción de Ascensor",
        outage_simulator_desc: "Simule una avería del ascensor en una estación de transferencia de la MTA para verificar el desvío.",
        simulate_outage: "Simular Avería de Ascensor",
        route_directions: "Direcciones Paso a Paso",
        hud_title: "Telemetría AR Lens LA84",
        hud_subtitle: "Pantalla virtual de visualización frontal que muestra coordenadas en tiempo real y pendientes.",
        gesture_controls_title: "Comandos de Gestos Simulados",
        gesture_controls_desc: "Interactúe con el HUD usando movimientos de coordenadas emulados y gestos con las manos.",
        gesture_pinch: "Pellizcar (Fijar Sede de Destino)",
        gesture_swipe: "Deslizar (Alternar Métricas)",
        gesture_wave: "Saludar (Descartar Alertas en Vivo)",
        telemetry_modifier_title: "Anulaciones de Flujo HUD",
        set_venue_focus: "Enfocar Sede Objetivo",
        density_label: "Simular Densidad",
        pitch_title: "Presentación de Google para Startups",
        pitch_subtitle: "Una propuesta de financiación profesional y esquema de solicitud de subvención sin fines de lucro."
    },
    hy: {
        nav_home: "Գլխավոր Էջ",
        nav_events: "Մայր Չացուցակ",
        nav_transit: "Տրանսպորտային Երթուղի",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "Startup Ներկայացում",
        select_language: "Լեզու",
        user_role: "Ինքնիշխան Հիմնադիր",
        home_title: "Էկոհամակարգի Հրամանատարություն",
        home_subtitle: "Սան Ֆերնանդո Հովտի և մեծ Լոս Անջելեսի բարձրացումը աշխարհին:",
        stat_events: "Ընդհանուր Իրադարձություններ",
        stat_events_sub: "Սինխրոնիզացված Ալեն Ռոսասի Մայր Ռեգիստրից",
        stat_accessibility: "ACCESSFriendly",
        stat_accessibility_sub: "Առանց աստիճանների, վերելակներով աուդիտավորված և հարթ նստեցումով",
        stat_budget: "Բյուջետային Խաղեր",
        stat_budget_sub: "Տոմսեր, որոնք հասանելի են $28-ից պակաս գնով",
        companion_title: "Ինտերակտիվ Լոգիստիկ Ուղեկիցներ",
        companion_desc: "Ընտրեք տեղական ուղեցույց կամ համաշխարհային մարզական աստղ՝ իրական ժամանակում ուղղություն ստանալու համար։",
        diagnostics_title: "Ինքնիշխան Շերտի Ախտորոշում",
        events_title: "LA28 Մայր Ծրագրավորող",
        events_subtitle: "Որոնեք, զտեք և պլանավորեք խաղերը 845 իրադարձությունների և 52 վայրերի միջև։",
        filter_under_28: "Մինչև $28 Տոմսեր",
        transit_title: "ACCESSFriendly Երթուղիչ",
        transit_subtitle: "MTA Մետրոյի, թեթև երկաթուղու և G/J Busway-ի չացուցակի սիմուլյատոր սայլակով նստեցման համար։",
        router_origin: "Սկզբնական Կետ",
        router_destination: "Օլիմպիական Ուղղություն",
        calculate_route: "Հաշվարկել Անխոչընդոտ Երթուղին",
        outage_simulator_title: "Վերելակի Խափանման Սիմուլյացիա",
        outage_simulator_desc: "Սիմուլյացնել վերելակի խափանումը MTA-ի հիմնական կայարանում՝ շրջանցման երթուղին ստուգելու համար։",
        simulate_outage: "Սիմուլյացնել Վերելակի Խափանումը",
        route_directions: "Քայլ առ Քայլ Ուղեցույց",
        hud_title: "LA84 Lens AR Տելեմետրիա",
        hud_subtitle: "Վիրտուալ էկրան, որը ցույց է տալիս իրական ժամանակում կոորդինատները և թեքությունները:",
        gesture_controls_title: "Ժեստերի Սիմուլյացիա",
        gesture_controls_desc: "Փոխազդեք HUD-ի հետ՝ օգտագործելով ձեռքի էմուլացված ժեստերը:",
        gesture_pinch: "Կսմթել (Ֆիքսել Թիրախային Վայրը)",
        gesture_swipe: "Սահեցնել (Փոխել Չափումները)",
        gesture_wave: "Թափահարել (Հեռացնել Ահազանգերը)",
        telemetry_modifier_title: "HUD Stream-ի Փոփոխություններ",
        set_venue_focus: "Կենտրոնանալ Վայրի Վրա",
        density_label: "Սիմուլյացնել Խտությունը",
        pitch_title: "Google-ը Startup-ների Համար",
        pitch_subtitle: "Պրոֆեսիոնալ ֆինանսավորման ներկայացում և ոչ առևտրային դրամաշնորհների հայտի նախագիծ:"
    },
    ja: {
        nav_home: "ダッシュボード",
        nav_events: "大会スケジュール",
        nav_transit: "乗換案内",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "スタートアップ提案",
        select_language: "言語選択",
        user_role: "主権創設者",
        home_title: "エコシステム指令部",
        home_subtitle: "サンフェルナンド・バレーとロサンゼルスを世界の舞台へ導く案内板。",
        stat_events: "総セッション数",
        stat_events_sub: "アラン・ローサスのマスター登録簿から同期",
        stat_accessibility: "バリアフリー化",
        stat_accessibility_sub: "段差なし・エレベーター監視・レベル乗車対応",
        stat_budget: "格安チケット",
        stat_budget_sub: "28ドル未満のチケットがあるセッション",
        companion_title: "対話型ロジスティクス・ガイド",
        companion_desc: "スポーツスターや現地の専門家を選んで、バリアフリー乗り換え情報と実況コメンタリーを聞きましょう。",
        diagnostics_title: "システム・セキュリティ自己診断",
        events_title: "LA28 スケジューラー",
        events_subtitle: "845件のセッション、52会場のデータを検索・計画。",
        filter_under_28: "28ドル未満チケット対象",
        transit_title: "ACCESSFriendly 最適ルート案内",
        transit_subtitle: "車いす乗車に対応したMTA地下鉄、ライトレール、G/Jバスウェイの乗換案内。",
        router_origin: "出発地",
        router_destination: "競技会場",
        calculate_route: "段差なしルートを検索",
        outage_simulator_title: "エレベーター故障シミュレーション",
        outage_simulator_desc: "主要乗換駅のエレベーター故障時のバリアフリー代替シャトル・ルートへの自動再検索の確認。",
        simulate_outage: "エレベーター故障を実行",
        route_directions: "乗車案内ステップ",
        hud_title: "LA84 レンズ AR 画面表示",
        hud_subtitle: "傾斜勾配、座標、料金席種をリアルタイム表示する仮想ウェアラブルHUD表示。",
        gesture_controls_title: "ジェスチャー指示コマンド",
        gesture_controls_desc: "指先の動きや手を振るジェスチャーでスマートグラスHUDを操作します。",
        gesture_pinch: "ピンチ（目標会場を固定）",
        gesture_swipe: "スワイプ（表示パラメータを切り替え）",
        gesture_wave: "ウェーブ（警告カードを閉じる）",
        telemetry_modifier_title: "HUD ストリーム調整",
        set_venue_focus: "表示会場を選択",
        density_label: "混雑度のシミュレート",
        pitch_title: "Google スタートアップ提案資料",
        pitch_subtitle: "Google Cloud Studio を活用した助成金申請とピッチデック構成。"
    },
    fr: {
        nav_home: "Accueil Dashboard",
        nav_events: "Programme",
        nav_transit: "Plan Transit",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "Présentation Startup",
        select_language: "Langue",
        user_role: "Fondateur Souverain",
        home_title: "Commandement de l'Écosystème",
        home_subtitle: "Propulser la vallée de San Fernando et le grand Los Angeles sur le devant de la scène mondiale.",
        stat_events: "Sessions Totales",
        stat_events_sub: "Synchronisé depuis le registre d'Alain Rosas",
        stat_accessibility: "ACCESSFriendly",
        stat_accessibility_sub: "Sans marche, ascenseurs audités & embarquement de niveau",
        stat_budget: "Jeux Abordables",
        stat_budget_sub: "Sessions avec tickets disponibles sous les 28$",
        companion_title: "Compagnons Logistiques Interactifs",
        companion_desc: "Sélectionnez une star du sport mondial ou un guide local pour obtenir des directions d'accessibilité en temps réel.",
        diagnostics_title: "Diagnostics du Système Souverain",
        events_title: "Planificateur Maître LA28",
        events_subtitle: "Recherchez, filtrez et planifiez parmi 845 sessions et 52 sites.",
        filter_under_28: "Tickets sous les $28",
        transit_title: "Planificateur de Transit ACCESSFriendly",
        transit_subtitle: "Simulateur de transport sur rail et busway MTA pour l'embarquement des fauteuils roulants.",
        router_origin: "Hub de Départ",
        router_destination: "Site Olympique",
        calculate_route: "Calculer l'Itinéraire Sans Marche",
        outage_simulator_title: "Simulation de Panne d'Ascenseur",
        outage_simulator_desc: "Simuler une panne d'ascenseur dans une station principale pour tester le réacheminement via navettes adaptées.",
        simulate_outage: "Simuler la Panne d'Ascenseur",
        route_directions: "Directions Étape par Étape",
        hud_title: "Télémétrie AR Lens LA84",
        hud_subtitle: "Affichage tête haute virtuel montrant les coordonnées, les pentes et la tarification.",
        gesture_controls_title: "Commandes Gestuelles Simulées",
        gesture_controls_desc: "Interagissez avec le HUD en utilisant des gestes de la main émulés.",
        gesture_pinch: "Pincer (Épingler le site cible)",
        gesture_swipe: "Balayer (Changer les métriques)",
        gesture_wave: "Saluer (Fermer les alertes)",
        telemetry_modifier_title: "Modificateurs du flux HUD",
        set_venue_focus: "Cibler le Site",
        density_label: "Simuler la Densité",
        pitch_title: "Présentation Google for Startups",
        pitch_subtitle: "Une proposition de financement de haut niveau et un plan de subvention pour organisme à but non lucratif."
    },
    tl: {
        nav_home: "Dashboard Home",
        nav_events: "Master na Iskedyul",
        nav_transit: "Ruta sa Transit",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "Startup Presentation",
        select_language: "Wika",
        user_role: "Soberanong Tagapagtatag",
        home_title: "Pamamahala ng Ecosistema",
        home_subtitle: "Pagpapakita sa San Fernando Valley at buong Los Angeles sa buong mundo.",
        stat_events: "Kabuuang Kaganapan",
        stat_events_sub: "Naka-sync mula sa Master Registry ni Alain Rosas",
        stat_accessibility: "ACCESSFriendly",
        stat_accessibility_sub: "Step-free, may elevator-audit at level-boarding",
        stat_budget: "Murang Tiket",
        stat_budget_sub: "May mga tiket na mas mababa sa $28",
        companion_title: "Kasamang Gabay sa Logistika",
        companion_desc: "Pumili ng lokal na gabay o sikat na manlalaro upang makakuha ng direksyon sa paratransit.",
        diagnostics_title: "Diyagnostiko sa System",
        events_title: "LA28 Master Scheduler",
        events_subtitle: "Maghanap at magplano sa 845 na kaganapan at 52 na lokasyon.",
        filter_under_28: "Mas mababa sa $28 na tiket",
        transit_title: "ACCESSFriendly Transit Router",
        transit_subtitle: "MTA Subway, Light Rail, at G/J Busway simulator para sa wheelchair boarding.",
        router_origin: "Panimulang Hub",
        router_destination: "Puntahang Venue",
        calculate_route: "Kalkulahin ang Ruta",
        outage_simulator_title: "Simulasyon ng Sira sa Elevator",
        outage_simulator_desc: "I-simulate ang pagkasira ng elevator sa istasyon upang magamit ang ibang accessible na ruta.",
        simulate_outage: "I-simulate ang Sira",
        route_directions: "Sunod-sunod na Direksyon",
        hud_title: "LA84 Lens AR Telemetry",
        hud_subtitle: "Virtual display na nagpapakita ng totoong coordinates at mga slope sa wheelchair ramp.",
        gesture_controls_title: "Mga Gesture Commands",
        gesture_controls_desc: "Gamitin ang mga kamay tulad ng pinch at swipe upang kontrolin ang smart HUD.",
        gesture_pinch: "Pinch (I-pin ang Venue)",
        gesture_swipe: "Swipe (Palitan ang Sukat)",
        gesture_wave: "Wave (I-dismiss ang Alerto)",
        telemetry_modifier_title: "HUD Overrides",
        set_venue_focus: "I-focus ang Venue",
        density_label: "Simulate ng Dami ng Tao",
        pitch_title: "Google Startup Program",
        pitch_subtitle: "Propesyonal na pagtatanghal ng startup para sa pondo at Google nonprofit grants."
    },
    ko: {
        nav_home: "대시보드 홈",
        nav_events: "전체 경기 일정",
        nav_transit: "휠체어 길찾기",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "스타트업 발표",
        select_language: "언어 선택",
        user_role: "설립 대표자",
        home_title: "에코시스템 통합 본부",
        home_subtitle: "샌퍼넌도 밸리와 로스앤젤레스 전체의 저력을 전 세계에 널리 알립니다.",
        stat_events: "총 세션 수",
        stat_events_sub: "알랭 로사스의 마스터 일정표와 실시간 동기화 완료",
        stat_accessibility: "교통 약자 편의",
        stat_accessibility_sub: "계단 없음・엘리베이터 실시간 점검・수평 승하차 보장",
        stat_budget: "알뜰 관람 경기",
        stat_budget_sub: "28달러 미만의 실속형 티켓 구매 가능 세션",
        companion_title: "대화형 안내 서비스 (컴패니언)",
        companion_desc: "현지 플래너 및 세계적 스포츠 스타를 선택해 장애인 콜택시 및 무장애 환승 안내를 받아보세요.",
        diagnostics_title: "시스템 보안 및 메모리 안전성 진단",
        events_title: "LA28 대시보드 일정 검색",
        events_subtitle: "845개 세션 및 52개 전체 경기장 상세 필터링 제공.",
        filter_under_28: "28달러 미만 티켓만 검색",
        transit_title: "ACCESSFriendly 무장애 최적 경로",
        transit_subtitle: "휠체어 탑승에 특화된 MTA 지하철, 경전철 및 G/J 간선버스(BRT) 연계 시뮬레이터.",
        router_origin: "출발역",
        router_destination: "목적지 경기장",
        calculate_route: "휠체어 맞춤형 최적 경로 검색",
        outage_simulator_title: "엘리베이터 임의 고장 시뮬레이션",
        outage_simulator_desc: "환승역 엘리베이터 고장 시 대체 무장애 셔틀 및 교통약자 우회 경로의 안전성을 모의 평가합니다.",
        simulate_outage: "엘리베이터 고장 발생시키기",
        route_directions: "단계별 상세 탑승 및 환승 경로",
        hud_title: "LA84 글래스 AR 실시간 화면",
        hud_subtitle: "경사도, 휠체어 램프 위치, 실시간 혼잡도 및 티켓 가격을 투사하는 AR HUD 시뮬레이터.",
        gesture_controls_title: "모의 제스처 조작",
        gesture_controls_desc: "손동작 제스처를 통해 가상 스마트 글래스 HUD를 실시간으로 조작해 보세요.",
        gesture_pinch: "핀치 (목적지 경기장 고정)",
        gesture_swipe: "스와이프 (화면 투사 매개변수 전환)",
        gesture_wave: "웨이브 (경고 및 실시간 알림 닫기)",
        telemetry_modifier_title: "HUD 정보 송출 조절",
        set_venue_focus: "초점 집중 경기장 선택",
        density_label: "가상 혼잡도 변경",
        pitch_title: "Google 스타트업 자금 유치 발표자료",
        pitch_subtitle: "Google Cloud Studio 인프라와 지도 API를 접목한 시민 과학형 사회 공헌 제안서."
    },
    de: {
        nav_home: "Dashboard Home",
        nav_events: "Gesamtplan",
        nav_transit: "Routenplaner",
        nav_hud: "LA84 AR HUD",
        nav_pitch: "Startup Präsentation",
        select_language: "Sprache",
        user_role: "Souveräner Gründer",
        home_title: "Ecosystem Zentrale",
        home_subtitle: "Das San Fernando Valley und das gesamte Umland von Los Angeles auf die globale Bühne heben.",
        stat_events: "Sitzungen Gesamt",
        stat_events_sub: "Synchronisiert mit Alain Rosas' Master-Register",
        stat_accessibility: "Barrierefrei",
        stat_accessibility_sub: "Stufenlos, Aufzüge geprüft und niveaugleicher Einstieg",
        stat_budget: "Budget-Tickets",
        stat_budget_sub: "Veranstaltungen mit Tickets unter 28 Dollar",
        companion_title: "Interaktive Logistik-Begleiter",
        companion_desc: "Wählen Sie einen lokalen Guide oder Sportstar, um Barrierefreie Routen und Sport-Kommentare zu erhalten.",
        diagnostics_title: "Sicherheits- & Speicherdiagnose",
        events_title: "LA28 Master-Terminkalender",
        events_subtitle: "Suchen und filtern Sie in 845 Terminen an 52 Austragungsorten.",
        filter_under_28: "Tickets unter $28",
        transit_title: "ACCESSFriendly Routenplaner",
        transit_subtitle: "MTA U-Bahn, Stadtbahn und G/J-Busway Simulator für barrierefreies Einsteigen.",
        router_origin: "Startpunkt Hub",
        router_destination: "Austragungsort Ziel",
        calculate_route: "Stufenlose Route berechnen",
        outage_simulator_title: "Aufzugausfall-Simulation",
        outage_simulator_desc: "Simulieren Sie einen Aufzugsausfall an einer Umsteigestation, um die barrierefreie Ausweichroute zu testen.",
        simulate_outage: "Aufzugausfall simulieren",
        route_directions: "Schritt-für-Schritt Wegbeschreibung",
        hud_title: "LA84 Lens AR Telenmetrie",
        hud_subtitle: "Virtuelles Head-Up-Display zur Echtzeit-Anzeige von Steigungen und Ticket-Preisen.",
        gesture_controls_title: "Gesten-Steuerung simulieren",
        gesture_controls_desc: "Steuern Sie das HUD mit emulierten Handgesten wie Wischen oder Drücken.",
        gesture_pinch: "Pinch (Zielort fixieren)",
        gesture_swipe: "Swipe (Ansichtsdaten umschalten)",
        gesture_wave: "Wave (Warnmeldungen verwerfen)",
        telemetry_modifier_title: "HUD-Daten anpassen",
        set_venue_focus: "Ort fokussieren",
        density_label: "Dichte anpassen",
        pitch_title: "Google für Startups Pitch-Deck",
        pitch_subtitle: "Ein professioneller Finanzierungsantrag und eine Förderungsstruktur für gemeinnützige Zwecke."
    }
};

// Companion Dialogue Data
const companions = {
    noah: {
        name: "Noah Lyles (USA)",
        title: "Olympic Sprint Champion",
        avatar: "🏃🏾‍♂️",
        quote: `"We are running down world records on the track, but the real victory is ensuring the entire city of LA is 100% accessible to every sports fan on earth. Let's map your transit!"`,
        elevAlert: `"RUTH Alert! Main elevator at 7th St/Metro Center is down. Take the paratransit shuttle directly or bypass via the Crenshaw K Line connector. Keep your speed up!"`
    },
    shacarri: {
        name: "Sha'Carri Richardson (USA)",
        title: "Olympic Sprint Queen",
        avatar: "🏃🏾‍♀️",
        quote: `"You have to bring your authentic self to the starting line. For LA28, that means a transit system that respects everyone. Select your destination, let's fly there together!"`,
        elevAlert: `"Hold on, there's a barrier at 7th St/Metro Center! The elevator is out of service. Don't worry, the ACCESSFriendly route is automatically updated to detour step-free!"`
    },
    keith: {
        name: "Keith McPherson (LA)",
        title: "ACCESSFriendly Founder",
        avatar: "🧑‍🦽",
        quote: `"Welcome to the sovereign command dashboard. As a wheelchair user, I know first-hand that digital and physical micro-barriers can completely change your day. That's why ACCESSFriendly is our badge of honor."`,
        elevAlert: `"System advisory: Elevator breakdown reported at 7th St. Ground paratransit vans are deployed. Rerouting us to Balboa/Woodley Busway drop-offs. Level boarding is secured."`
    },
    alain: {
        name: "Alain Rosas (LA)",
        title: "Master Data Planner",
        avatar: "📊",
        quote: `"Hey there! I worked hard parsing all 845 sessions in our V2 registry. I also added seat charts and price brackets to make sure you get the best accessible seats under budget. Let's explore!"`,
        elevAlert: `"Data stream update! Elevator outage detected. Recalculating path nodes immediately. Switching to our pre-planned accessible transit bypass routes."`
    }
};

// Transit Routing Data
const transitRoutes = {
    // From LAX
    "lax-sofi": {
        line: "C & K Lines (Green & Crenshaw)",
        path: "M 120 380 L 250 380 L 250 340",
        steps: [
            { desc: "Board the Metro Green Line (C Line) at LAX Aviation Station.", sub: "Ramp deployable boarding, level-entry platforms." },
            { desc: "Transfer at Crenshaw/I-105 Station to the K Line (Crenshaw Link).", sub: "Fully functioning step-free elevators to transfer deck." },
            { desc: "Arrive at SoFi Station (Inglewood).", sub: "Exit directly to the Special Olympics paratransit stadium shuttle gates." }
        ],
        bypass: [
            { desc: "Board paratransit shuttle directly from LAX Aviation Hub.", sub: "Elevator at transfer deck is undergoing maintenance. Bypass active." },
            { desc: "Direct step-free highway lane drop-off at SoFi Gate 2.", sub: "Reserved wheelchair loading zone." }
        ]
    },
    "lax-coliseum": {
        line: "C, K & E Lines (Green, Crenshaw & Expo)",
        path: "M 120 380 L 250 380 L 250 280 L 320 280",
        steps: [
            { desc: "Board C Line (Green) east towards Crenshaw.", sub: "Wheelchair priority cabin boarding." },
            { desc: "Transfer to K Line (Crenshaw/LAX) heading north to Expo/Crenshaw.", sub: "High-grade tactile tiles and audible floor voice warnings." },
            { desc: "Board E Line (Expo) east directly to Expo Park/USC Station.", sub: "Direct surface-level crossing to Coliseum gates." }
        ],
        bypass: [
            { desc: "Board Metro C Line to Willowbrook/Rosa Parks Station.", sub: "Transfer to paratransit bus route 204 north." },
            { desc: "Arrive at Coliseum south plaza.", sub: "Step-free curb cuts and ramp boarding." }
        ]
    },
    "lax-valley": {
        line: "C Line & G-Line Busway",
        path: "M 120 380 L 250 380 L 250 100 L 80 100",
        steps: [
            { desc: "Board paratransit shuttle north to NoHo Metro G-Line Busway.", sub: "Direct boarding vehicle with hydraulic lift system." },
            { desc: "Transfer to Metro G Line (Orange Line) heading west to Valley Complex.", sub: "Sepulveda Basin skateboard/3x3 basketball drop-off. 100% flat platform." }
        ],
        bypass: [
            { desc: "Direct ACCESSFriendly Dial-A-Ride from LAX terminal.", sub: "Door-to-door transit for mobility impairments." }
        ]
    },
    "lax-rosebowl": {
        line: "C, A & Gold Lines",
        path: "M 120 380 L 320 380 L 320 200 L 450 120",
        steps: [
            { desc: "Board C Line (Green) east to Willowbrook/Rosa Parks.", sub: "Level-boarding cars." },
            { desc: "Transfer to A Line (Gold Line Subway) north straight to Pasadena.", sub: "High speed elevators active at all stations." },
            { desc: "Exit Memorial Park Station and board the Rose Bowl accessible shuttle.", sub: "Bus has low-floor kneeling mechanism and dual ramp deployments." }
        ],
        bypass: [
            { desc: "Board paratransit coach directly from LAX to Rose Bowl Lot B.", sub: "Bypasses all subway changes. Ideal for heavy event days." }
        ]
    },
    "lax-longbeach": {
        line: "C & A Lines (Green & Blue)",
        path: "M 120 380 L 320 380 L 380 430",
        steps: [
            { desc: "Board C Line (Green) east to Willowbrook/Rosa Parks.", sub: "Smooth transfer point." },
            { desc: "Transfer to A Line (Blue Line) south to Downtown Long Beach.", sub: "Wide wheelchair priority deck doors." },
            { desc: "Arrive at Long Beach Arena.", sub: "Level entrance from Promenade." }
        ],
        bypass: [
            { desc: "Board accessible paratransit express coach at LAX.", sub: "Highway lane routing directly to Belmont Shore drop-off." }
        ]
    },
    "lax-carson": {
        line: "C & A Lines",
        path: "M 120 380 L 320 380 L 320 380",
        steps: [
            { desc: "Board C Line (Green) east to Willowbrook.", sub: "Step-free ramp priority." },
            { desc: "Transfer to A Line south, exit at Del Amo Station.", sub: "Elevator access is fully verified." },
            { desc: "Board Carson Circuit accessible bus directly to Dignity Health Sports Park.", sub: "Dedicated wheelchair locks in bus cabin." }
        ],
        bypass: [
            { desc: "Paratransit direct dispatch from LAX.", sub: "Avoids train boarding entirely." }
        ]
    },

    // From NoHo (Valley)
    "noho-valley": {
        line: "Orange Line (G-Line Busway)",
        path: "M 250 100 L 80 100",
        steps: [
            { desc: "Board Metro G Line (Orange Line) busway heading west.", sub: "Bus has boarding ramps at all doors, floor is level with bus platform." },
            { desc: "Arrive at Balboa or Woodley Station.", sub: "Sepulveda Basin sports park entrance is 100% step-free." }
        ],
        bypass: [
            { desc: "Board G-Line Busway West (Alternate accessible vehicle).", sub: "Fully wheelchair lock-equipped." }
        ]
    },
    "noho-sofi": {
        line: "G-Line Busway & K Line",
        path: "M 250 100 L 250 280 L 250 340",
        steps: [
            { desc: "Board paratransit express south to Expo/Crenshaw Station.", sub: "Low floor accessible transit." },
            { desc: "Board K Line (Crenshaw) south directly to Downtown Inglewood.", sub: "Excellent elevator safety index." }
        ],
        bypass: [
            { desc: "Direct Sepulveda Basin paratransit connector shuttle.", sub: "Bypasses downtown congestion entirely." }
        ]
    },
    "noho-coliseum": {
        line: "B & E Lines (Red & Expo Subway)",
        path: "M 250 100 L 320 200 L 320 280",
        steps: [
            { desc: "Board B Line (Red Line subway) south at NoHo to 7th St/Metro Center.", sub: "Deep subway elevators verified operational." },
            { desc: "Transfer to E Line (Expo) west towards Santa Monica.", sub: "Level platform boarding." },
            { desc: "Arrive at Expo Park/USC Station.", sub: "Step-free ramp directly into Exposition Park." }
        ],
        bypass: [
            { desc: "Board B Line (Red) to Westlake/MacArthur Park Station.", sub: "Transfer to dedicated paratransit shuttle 102 directly to the Coliseum south ramp." },
            { desc: "Bypasses 7th St/Metro Center elevators.", sub: "RUTH verified step-free route." }
        ]
    },

    // From Union Station
    "union-coliseum": {
        line: "B/D Subway & E Line",
        path: "M 320 200 L 320 280",
        steps: [
            { desc: "Board B or D Line subway south to 7th St/Metro Center.", sub: "Subway elevators operational." },
            { desc: "Transfer to E Line (Expo) west, exit at Expo Park/USC.", sub: "Direct level platform." }
        ],
        bypass: [
            { desc: "Board paratransit express bus 40 direct from Union Station plaza.", sub: "Bypasses subway elevators entirely." },
            { desc: "Drop-off at Coliseum Gate 1 wheelchair ramp.", sub: "Step-free curb mapping." }
        ]
    },
    "union-sofi": {
        line: "B/D, E & K Lines",
        path: "M 320 200 L 320 280 L 250 280 L 250 340",
        steps: [
            { desc: "Board B Line south to 7th St/Metro Center.", sub: "Subway transfer deck." },
            { desc: "Transfer to E Line (Expo) west to Crenshaw Station.", sub: "Level-boarding." },
            { desc: "Transfer to K Line south to Inglewood SoFi Station.", sub: "Wheelchair ramps operational." }
        ],
        bypass: [
            { desc: "Board direct SoFi Express paratransit bus from Union Station West Plaza.", sub: "Direct HOV lane routing with hydraulic wheelchair boarding lift." }
        ]
    },
    "union-valley": {
        line: "B Line & G-Line Busway (Red & Orange)",
        path: "M 320 200 L 250 100 L 80 100",
        steps: [
            { desc: "Board B Line subway north from Union Station to NoHo Station.", sub: "Level-platform subway cars." },
            { desc: "Transfer to G Line (Orange Line Busway) west to Valley Complex.", sub: "100% accessible level boarding at all Valley stations." }
        ],
        bypass: [
            { desc: "Direct paratransit express coach via I-101 carpool lane.", sub: "Avoids NoHo station elevator transfer. Fully automated securement." }
        ]
    }
};

// Google for Startups Pitch Slide Deck Contents
const slides = [
    {
        title: "ACCESSFriendly LA28",
        tag: "Slide 1: Vision & Mission",
        bullets: [
            "Goal: Seamless, car-less transit routing for the world's largest sporting event.",
            "Accessibility-First: Tailored for wheelchair users, older adults, and families.",
            "Integration: High-fidelity mapping of micro-barriers like broken elevators.",
            "Sovereignty: Powered by sovereign data layer ensuring full compliance and security."
        ],
        stat: "100%",
        statLabel: "Accessible Transit Goal"
    },
    {
        title: "The Core Challenge",
        tag: "Slide 2: The Physical Micro-Barriers",
        bullets: [
            "Current apps map roads and simple transits, but ignore elevator breakdowns.",
            "A single broken elevator at 7th St/Metro Center ruins a wheelchair user's entire trip.",
            "Over 150,000 mobility-impaired spectators are attending, requiring robust transit.",
            "Need dynamic, real-time rerouting around transit elevator outages."
        ],
        stat: "150K+",
        statLabel: "Spectators with Limited Mobility"
    },
    {
        title: "ACCESSFriendly Solution",
        tag: "Slide 3: Real-Time Active Transit",
        bullets: [
            "GTFS Real-Time data engine combined with live elevator status API.",
            "Smart Routing: Automatically recalculates paths to suggest accessible alternatives.",
            "Integrated Companion: Features star athletics providing motivation and directions.",
            "Multi-language (i18n): Instant UI support for 8 global languages."
        ],
        stat: "Realtime",
        statLabel: "GTFS Data Ingestion"
    },
    {
        title: "Sovereign Leadership Team",
        tag: "Slide 4: Lived Context & Founding",
        bullets: [
            "Founded by Keith McPherson, a wheelchair user with deep civic tech experience.",
            "Alain Rosas: Lead master data architect and scheduling expert.",
            "Inspirational Partners: Noah Lyles & Sha'Carri Richardson pushing accessibility.",
            "Driven by lived experience, creating products that solve actual street barriers."
        ],
        stat: "Keith M.",
        statLabel: "Founder & Sovereign Lead"
    },
    {
        title: "Platform Features & SDK",
        tag: "Slide 5: LA84 Sunglasses HUD Integration",
        bullets: [
            "Visual Overlay: AR Smart Sunglasses project slope grade and elevator status.",
            "Gesture Recognition: Pinch-to-Pin venues and Wave-to-Dismiss alerts.",
            "Zero-Latency: Runs locally on Swift native core modules.",
            "Antigravity Protocol: Emulated high-fidelity telemetry payloads."
        ],
        stat: "HUD AR",
        statLabel: "LA84 Smart Glass SDK"
    },
    {
        title: "The Valley Spotlight",
        tag: "Slide 6: Elevating San Fernando Valley",
        bullets: [
            "The Valley is hosting key BMX, Skateboarding, and 3x3 Basketball events.",
            "Valley Complexes 1, 2, 3, and 4 are fully integrated into our menu systems.",
            "MTA G-Line (Orange Line) Busway highlights 100% accessible level-boarding.",
            "Promotes local businesses, eateries, and transit in the SF Valley region."
        ],
        stat: "100%",
        statLabel: "G-Line Busway Level-Boarding"
    },
    {
        title: "Google Startup Tech Stack",
        tag: "Slide 7: Powered by Google Cloud Studio",
        bullets: [
            "Hosting: Google Cloud Run for rapid, serverless scaling on heavy days.",
            "Database: BigQuery compiling transit logs and elevator uptime data.",
            "Maps: Google Maps Platform Directions & Places API with custom styling.",
            "Sovereignty: Confidential VMs securing user coordinates and profile data."
        ],
        stat: "GCP",
        statLabel: "Confidential Sovereign Hosting"
    },
    {
        title: "Civic & Nonprofit Alignment",
        tag: "Slide 8: Google Nonprofits Program",
        bullets: [
            "Sponsor: Special Olympics logistics coordination using our transit API.",
            "Social Goal: Eliminate car dependency (carless transit) for large events.",
            "Community: Crowdsourced sidewalk ramp audit database.",
            "Government: Supporting LA MTA scheduling teams with real-time feedback."
        ],
        stat: "Social",
        statLabel: "Nonprofit Impact Framework"
    },
    {
        title: "Project Roadmap & Timeline",
        tag: "Slide 9: Scaling Up to 2028",
        bullets: [
            "Phase 1 (2026): Master menu compilation and schedule ingestion (845 sessions).",
            "Phase 2 (2027): Live pilots with LA Metro paratransit shuttle fleets.",
            "Phase 3 (2028): Global launch in 8 languages ahead of the Opening Ceremonies.",
            "Post-Games (2029+): Permanent accessibility infrastructure maps for the City of LA."
        ],
        stat: "2026-28",
        statLabel: "Full Scale Deployment"
    },
    {
        title: "The Ask & Next Steps",
        tag: "Slide 10: Partnerships & Funding",
        bullets: [
            "Google Startup/Nonprofit Grants: $100k in Google Maps Platform API credits.",
            "Engineering Mentorship: Direct alignment with Google Accessibility teams.",
            "Launch Stage: Deploying the alpha companion app to 10,000 local beta testers.",
            "Join the Movement: Let's make LA28 the most inclusive event in human history!"
        ],
        stat: "$100K",
        statLabel: "API Grants & Acceleration"
    }
];

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    // Load Events Data
    loadEventsData();

    // Render default slide
    renderSlide(currentSlideIndex);

    // Initial Route calculation
    plotRoute();

    // HUD Telemetry Loop
    initHUDTelemetry();

    // Initial loaded database views
    showCivicCity("burbank");
    showValleyResource("northbsc");
});

// Load parsed JSON events database
function loadEventsData() {
    // Fetch from relative path la28_events.json
    fetch('la28_events.json')
        .then(res => res.json())
        .then(data => {
            allEvents = data;
            
            // Extract sports and zones dynamically
            const sports = [...new Set(data.map(e => e.sport))].sort();
            const zones = [...new Set(data.map(e => e.zone))].sort();
            
            // Populate dropdowns
            const sportSelect = document.getElementById("sportFilter");
            sports.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s;
                opt.textContent = s;
                sportSelect.appendChild(opt);
            });

            const zoneSelect = document.getElementById("zoneFilter");
            zones.forEach(z => {
                const opt = document.createElement("option");
                opt.value = z;
                opt.textContent = z;
                zoneSelect.appendChild(opt);
            });

            // Update stats
            document.getElementById("statTotalEvents").textContent = data.length;
            
            const budgetCount = data.filter(e => {
                const minPrice = Math.min(...Object.values(e.prices || { 'dummy': 999 }));
                return minPrice < 28.0;
            }).length;
            document.getElementById("statBudgetSessions").textContent = budgetCount;

            // Render list
            filterEvents();
        })
        .catch(err => {
            console.error("Error loading events database:", err);
            // Inject fallback static data in case of fetch block
            allEvents = [
                {
                    sport: "Ceremony",
                    venue: "2028 Stadium",
                    zone: "Inglewood",
                    sessionCode: "CER01A",
                    date: "2028-07-14 (Friday)",
                    gamesDay: 0,
                    sessionType: "Ceremony",
                    description: "Opening Ceremony",
                    startTime: "17:00",
                    endTime: "20:00",
                    prices: { A: 5519.34, B: 3906.95, C: 2604.53, D: 1612.39 }
                },
                {
                    sport: "3x3 Basketball",
                    venue: "Valley Complex 3",
                    zone: "Valley",
                    sessionCode: "BK301",
                    date: "2028-07-16 (Sunday)",
                    gamesDay: 2,
                    sessionType: "Preliminary",
                    description: "Men's Pool Round (2 Games); Women's Pool Round (2 Games)",
                    startTime: "14:00",
                    endTime: "16:00",
                    prices: { A: 365.89, B: 155.04, C: 28.00 }
                }
            ];
            filterEvents();
        });
}

// Search and filter events dynamically
function filterEvents() {
    const query = document.getElementById("eventSearch").value.toLowerCase();
    const sport = document.getElementById("sportFilter").value;
    const zone = document.getElementById("zoneFilter").value;
    const budgetOnly = document.getElementById("budgetFilter").checked;

    const filtered = allEvents.filter(e => {
        const matchesQuery = e.sport.toLowerCase().includes(query) || 
                             e.venue.toLowerCase().includes(query) || 
                             e.description.toLowerCase().includes(query) ||
                             e.sessionCode.toLowerCase().includes(query);
                             
        const matchesSport = sport === "" || e.sport === sport;
        const matchesZone = zone === "" || e.zone === zone;
        
        let matchesBudget = true;
        if (budgetOnly) {
            const prices = Object.values(e.prices || {});
            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                matchesBudget = minPrice < 28.0;
            } else {
                matchesBudget = false;
            }
        }

        return matchesQuery && matchesSport && matchesZone && matchesBudget;
    });

    // Update count badge
    document.getElementById("eventsCountBadge").textContent = `${filtered.length} Sessions`;

    // Render list (cap at 100 for high performance rendering)
    const listContainer = document.getElementById("eventsList");
    listContainer.innerHTML = "";

    if (filtered.length === 0) {
        listContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No matching sessions found. Try tweaking your filters!</div>`;
        return;
    }

    const toRender = filtered.slice(0, 100);
    toRender.forEach(e => {
        const row = document.createElement("div");
        row.className = "event-row";
        
        const prices = Object.values(e.prices || {});
        let priceStr = "TBD";
        let isBudget = false;
        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            priceStr = `$${minPrice.toFixed(2)}`;
            if (minPrice < 28.0) {
                isBudget = true;
            }
        }

        row.innerHTML = `
            <div class="event-main">
                <span class="event-sport">${e.sport}</span>
                <span class="event-title">${e.description}</span>
                <div class="event-meta">
                    <span>📍 <strong>${e.venue}</strong> (${e.zone})</span>
                    <span>🕒 ${e.date} | ${e.startTime} - ${e.endTime}</span>
                    <span>🔑 Code: ${e.sessionCode}</span>
                </div>
            </div>
            <div class="event-prices-tag">
                <span class="price-bracket">${priceStr}</span>
                <span class="price-label">Starting At</span>
                ${isBudget ? `<span class="price-tag-budget">Budget Option</span>` : ''}
            </div>
        `;
        listContainer.appendChild(row);
    });

    if (filtered.length > 100) {
        const moreDiv = document.createElement("div");
        moreDiv.style.cssText = "text-align:center; padding:15px; color:var(--accent-teal); font-weight:bold; font-size:0.85rem;";
        moreDiv.textContent = `+ ${filtered.length - 100} additional sessions matching. Refine search for more details.`;
        listContainer.appendChild(moreDiv);
    }
}

// Switch tabs inside the single page architecture
function switchTab(tabName) {
    // Deactivate all
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));

    // Close mobile menu if open
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("mobileSidebarOverlay");
    if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }

    // Activate selected
    if (tabName === 'home') {
        document.getElementById("navHome").classList.add("active");
        document.getElementById("tab-home").classList.add("active");
    } else if (tabName === 'events') {
        document.getElementById("navEvents").classList.add("active");
        document.getElementById("tab-events").classList.add("active");
    } else if (tabName === 'transit') {
        document.getElementById("navTransit").classList.add("active");
        document.getElementById("tab-transit").classList.add("active");
        plotRoute(); // Recalculate route lines
    } else if (tabName === 'hud') {
        document.getElementById("navHUD").classList.add("active");
        document.getElementById("tab-hud").classList.add("active");
    } else if (tabName === 'pitch') {
        document.getElementById("navPitch").classList.add("active");
        document.getElementById("tab-pitch").classList.add("active");
    } else if (tabName === 'workforce') {
        document.getElementById("navWorkforce").classList.add("active");
        document.getElementById("tab-workforce").classList.add("active");
    } else if (tabName === 'civic') {
        document.getElementById("navCivic").classList.add("active");
        document.getElementById("tab-civic").classList.add("active");
    } else if (tabName === 'figma') {
        document.getElementById("navFigma").classList.add("active");
        document.getElementById("tab-figma").classList.add("active");
    } else if (tabName === 'prompts') {
        document.getElementById("navPrompts").classList.add("active");
        document.getElementById("tab-prompts").classList.add("active");
    }
}

// Switch sub-tabs inside the Civic & Governance Command tab
function switchCivicSub(subTabName) {
    // Hide all civic sub-contents
    document.querySelectorAll(".civic-sub-content").forEach(content => {
        content.style.display = "none";
    });
    
    // Reset background and style for sub-tab buttons
    const btnValley = document.getElementById("btnCivicSubValley");
    const btnBoard = document.getElementById("btnCivicSubBoard");
    const btnProtocol = document.getElementById("btnCivicSubProtocol");
    
    [btnValley, btnBoard, btnProtocol].forEach(btn => {
        if (btn) {
            btn.style.background = "rgba(0,0,0,0.05)";
            btn.style.color = "var(--text-primary)";
        }
    });
    
    // Activate clicked sub-tab
    const targetContent = document.getElementById(`civic-sub-${subTabName}`);
    if (targetContent) {
        targetContent.style.display = "block";
    }
    
    const activeBtn = document.getElementById(`btnCivicSub${subTabName.charAt(0).toUpperCase() + subTabName.slice(1)}`);
    if (activeBtn) {
        activeBtn.style.background = "var(--accent-purple)";
        activeBtn.style.color = "white";
    }
    
    // Update diagnostic logs
    document.getElementById("diagnosticLogs").textContent += `\n[GOVERNANCE] Sub-tab navigation: switched to ${subTabName.toUpperCase()}`;
}

// Change language of whole interface dynamically (i18n)
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Scan DOM for i18n tags and translate
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (i18n[lang] && i18n[lang][key]) {
            elem.textContent = i18n[lang][key];
        }
    });

    // Update active companion dialogue for the language
    updateCompanionSpeech();
    
    // Re-render schedule filters & route steps to match
    filterEvents();
    plotRoute();
}

// Logistics Companion Selection
function selectCompanion(name) {
    activeCompanion = name;
    
    // Toggle active avatar outline
    document.querySelectorAll(".companion-avatar").forEach(avatar => avatar.classList.remove("active"));
    
    if (name === 'noah') document.getElementById("compNoah").classList.add("active");
    if (name === 'shacarri') document.getElementById("compShaCarri").classList.add("active");
    if (name === 'keith') document.getElementById("compKeith").classList.add("active");
    if (name === 'alain') document.getElementById("compAlain").classList.add("active");

    updateCompanionSpeech();
}

// Update the speech bubble text from the companion
function updateCompanionSpeech() {
    const comp = companions[activeCompanion];
    const nameElem = document.getElementById("companionName");
    const quoteElem = document.getElementById("companionQuote");

    nameElem.textContent = `${comp.name} - ${comp.title}`;

    if (elevatorOutageActive) {
        quoteElem.textContent = comp.elevAlert;
        quoteElem.style.color = "var(--color-error)";
    } else {
        quoteElem.textContent = comp.quote;
        quoteElem.style.color = "var(--text-primary)";
    }
}

// Calculate transit paratransit routes
function plotRoute() {
    const origin = document.getElementById("originSelect").value;
    const dest = document.getElementById("destSelect").value;
    const key = `${origin}-${dest}`;

    const routeData = transitRoutes[key];
    const routeStepsDiv = document.getElementById("routeSteps");
    const activeRoutePath = document.getElementById("activeRoutePath");
    
    if (!routeData) {
        routeStepsDiv.innerHTML = `<div style="color:var(--text-muted); text-align:center; padding:20px;">No direct subway path. Tap 'Calculate Step-Free Route' or select another venue.</div>`;
        activeRoutePath.style.display = "none";
        return;
    }

    // Set SVG active path coordinates
    activeRoutePath.setAttribute("d", routeData.path);
    activeRoutePath.style.display = "block";

    // Build Step instructions depending on Elevator Outage State
    const activeSteps = elevatorOutageActive ? (routeData.bypass || routeData.steps) : routeData.steps;

    routeStepsDiv.innerHTML = "";
    activeSteps.forEach((step, idx) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "route-step";
        stepDiv.innerHTML = `
            <div class="step-number" style="${elevatorOutageActive ? 'background:rgba(255,23,68,0.2); color:var(--color-error);' : ''}">${idx + 1}</div>
            <div class="step-details">
                <span class="step-desc">${step.desc}</span>
                <span class="step-sub">${step.sub}</span>
            </div>
        `;
        routeStepsDiv.appendChild(stepDiv);
    });

    // Update map status pill based on outage
    const badge = document.getElementById("routerStatusBadge");
    const elevUnionStatus = document.getElementById("elevUnionStatus");
    
    if (elevatorOutageActive) {
        badge.textContent = "Bypass Plan Active";
        badge.className = "badge badge-orange";
        elevUnionStatus.setAttribute("stroke", "var(--color-error)");
        // Trigger pulse glow
        elevUnionStatus.innerHTML = `<animate attributeName="r" values="16;22;16" dur="1.5s" repeatCount="indefinite"/>`;
    } else {
        badge.textContent = "Optimal Step-Free Route";
        badge.className = "badge badge-teal";
        elevUnionStatus.setAttribute("stroke", "var(--color-success)");
        elevUnionStatus.innerHTML = ""; // Clear animation
    }
}

// Toggle Station Elevator Outage Simulation
function toggleOutage() {
    elevatorOutageActive = !elevatorOutageActive;
    
    const btn = document.getElementById("btnOutageToggle");
    
    if (elevatorOutageActive) {
        btn.classList.add("active");
        btn.textContent = "Clear Elevator Outage";
        // Append active diagnostics warning
        document.getElementById("diagnosticLogs").textContent += `\n[MTA-ALARM] Outage reported: 7th St/Metro Center elevator OUT OF SERVICE. Auto-rerouting in progress.`;
    } else {
        btn.classList.remove("active");
        btn.textContent = "Simulate Station Outage";
        document.getElementById("diagnosticLogs").textContent += `\n[MTA-REPAIR] Elevator clearance: 7th St/Metro Center elevator is online and verified.`;
    }

    // Refresh companion bubble & directions
    updateCompanionSpeech();
    plotRoute();
}

// Click nodes on the SVG Map
function mapNodeClick(nodeName) {
    document.getElementById("diagnosticLogs").textContent += `\n[GPS-NAV] Station focus: ${nodeName} coordinates verified. Grade slope checked.`;
    
    // Play minor blink animation on focused node
    const nodeIds = {
        'Valley': 'nodeValley',
        'NoHo': 'nodeNoHo',
        'Union Station': 'nodeUnion',
        'Exposition Park': 'nodeExpoPark',
        'SoFi': 'nodeSoFi',
        'LAX': 'nodeLAX',
        'Carson': 'nodeCarson',
        'Long Beach': 'nodeLongBeach',
        'Rose Bowl': 'nodeRoseBowl'
    };
    
    const id = nodeIds[nodeName];
    if (id) {
        const elem = document.getElementById(id);
        elem.setAttribute("r", "14");
        setTimeout(() => elem.setAttribute("r", id === 'nodeUnion' ? '10' : id === 'nodeLAX' ? '9' : '8'), 300);
    }
}

// Initialize HUD Telemetry physics & overlays
function initHUDTelemetry() {
    const viewport = document.getElementById("hudViewport");
    
    // Dynamic coordinate float when moving mouse over HUD
    viewport.addEventListener("mousemove", (e) => {
        const rect = viewport.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Generate pseudo coordinates
        const lat = (34.0124 + (y / 5000)).toFixed(4);
        const lng = (-118.2871 - (x / 5000)).toFixed(4);
        document.getElementById("hudGpsCoord").textContent = `${lat}° N, ${lng}° W`;

        // Pseudo slope physics
        const slope = (1.5 + (x * y / 60000)).toFixed(1);
        document.getElementById("hudSlopeVal").textContent = `${slope}°`;
        
        // Dynamic positioning of floating target labels
        const targetVenue = document.getElementById("hudTargetVenue");
        targetVenue.style.transform = `translate(${(x - rect.width/2)/20}px, ${(y - rect.height/2)/20}px)`;
    });
}

// Simulated gesture triggers
function simulateGesture(type) {
    const targetCard = document.getElementById("hudTargetVenue");
    
    if (type === 'pinch') {
        document.getElementById("diagnosticLogs").textContent += `\n[AR-GESTURE] PINCH detected. Target pinned securely to glasses viewport.`;
        targetCard.style.borderColor = "var(--color-success)";
        targetCard.style.boxShadow = "0 0 20px var(--color-success)";
        
        // Temporary feedback popup
        const flash = document.createElement("div");
        flash.style.cssText = "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:var(--color-success); font-family:var(--font-mono); font-weight:800; font-size:1.5rem; background:rgba(0,0,0,0.8); padding:10px 20px; border-radius:8px; border:2px solid var(--color-success); z-index:10;";
        flash.textContent = "VENUE PINNED ✓";
        document.getElementById("hudViewport").appendChild(flash);
        setTimeout(() => flash.remove(), 1200);
        
    } else if (type === 'swipe') {
        document.getElementById("diagnosticLogs").textContent += `\n[AR-GESTURE] SWIPE detected. Toggling HUD telemetry parameters.`;
        // Toggle neon cyan vs purple highlights
        const v = document.getElementById("hudViewport");
        if (v.style.borderColor === "rgb(189, 0, 255)") {
            v.style.borderColor = "var(--accent-teal)";
            v.style.boxShadow = "0 0 30px rgba(0, 240, 255, 0.15)";
        } else {
            v.style.borderColor = "var(--accent-purple)";
            v.style.boxShadow = "0 0 30px rgba(189, 0, 255, 0.25)";
        }
    } else if (type === 'wave') {
        document.getElementById("diagnosticLogs").textContent += `\n[AR-GESTURE] WAVE detected. Dismissing diagnostic screen warnings.`;
        // Slide out second card temporary
        const transCard = document.getElementById("hudTargetTransit");
        transCard.style.opacity = "0";
        setTimeout(() => transCard.style.opacity = "1", 2500);
    }
}

// Update HUD Stream Focus
function updateHUDFocus(venueKey) {
    const venueNameMap = {
        coliseum: { 
            name: "LA Coliseum", 
            slope: "1.8°", 
            path: "Step-Free Ramp",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7289569766946!2d-118.28822072382103!3d34.01416957317135!2m3!1f340!2f25!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x80c2f80872da1c13%3A0xe5a36399b9cf9c6b!2sLos%20Angeles%20Memorial%20Coliseum!5e1!3m2!1sen!2sus!4v1716499999999!5m2!1sen!2sus"
        },
        sofi: { 
            name: "Inglewood SoFi", 
            slope: "0.5°", 
            path: "Elevator Corridor",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.238466179326!2d-118.3418873238253!3d33.95346852309831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b65100000001%3A0x6e2dfa3e9c8bc23!2sSoFi%20Stadium!5e0!3m2!1sen!2sus!4v1716500000000"
        },
        valley: { 
            name: "Sepulveda Basin", 
            slope: "0.0° (Flat)", 
            path: "G-Line Busway",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.78917822986!2d-118.50424562381121!3d34.17724281144078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2999e525167cb%3A0x5109b0b41c0989f6!2sSepulveda%20Basin%20Recreation%20Area!5e0!3m2!1sen!2sus!4v1716500000000"
        },
        rosebowl: { 
            name: "Pasadena RoseBowl", 
            slope: "3.2°", 
            path: "Accessible Shuttle",
            embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.6656094595204!2d-118.17021642380979!3d34.205779012920235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c312ad219d3b%3A0x4a18ad2efc272a8c!2sRose%20Bowl%20Stadium!5e0!3m2!1sen!2sus!4v1716500000000"
        }
    };

    const details = venueNameMap[venueKey];
    if (details) {
        // Update the iframe source dynamically inside the viewport!
        const iframe = document.querySelector("#hudViewport iframe");
        if (iframe) {
            iframe.src = details.embed;
        }

        document.getElementById("hudTargetVenue").innerHTML = `
            <div style="font-weight:bold; border-bottom:1px solid rgba(0,240,255,0.3); padding-bottom:3px; margin-bottom:4px;">TARGET VENUE</div>
            <div>Name: <span style="color:white; font-weight:bold;">${details.name}</span></div>
            <div>Path: <span style="color:var(--color-success); font-weight:bold;">${details.path}</span></div>
            <div>Slope: <span style="color:white;">${details.slope}</span></div>
        `;
        document.getElementById("diagnosticLogs").textContent += `\n[AR-STREAM] Viewport focus shifted to: ${details.name}`;
    }
}

// Update HUD Crowd Density Indicator
function updateHUDDensity(val) {
    const crowdVal = document.getElementById("hudCrowdVal");
    let label = "Low";
    let color = "var(--color-success)";

    if (val > 40 && val <= 75) {
        label = "Moderate";
        color = "var(--color-warning)";
    } else if (val > 75) {
        label = "High";
        color = "var(--color-error)";
    }
    
    crowdVal.textContent = `${label} (${val}%)`;
    crowdVal.style.color = color;
}

// Render Slide Presentation
function renderSlide(index) {
    currentSlideIndex = index;
    const slide = slides[index];
    const canvas = document.getElementById("slideViewer");
    
    // Update badge in header
    document.getElementById("pitchBadge").textContent = `Slide ${index + 1} of ${slides.length}`;
    document.getElementById("slideNumberDisplay").textContent = `SLIDE ${index + 1}/${slides.length}`;

    // Generate list bullets
    const bulletsHtml = slide.bullets.map(b => `<li class="slide-bullet">${b}</li>`).join("");

    canvas.innerHTML = `
        <div class="slide-header">
            <span class="slide-tag">${slide.tag}</span>
            <span class="slide-num">${(index+1).toString().padStart(2, '0')}</span>
        </div>
        
        <div class="slide-body slide-grid">
            <div>
                <h2 class="slide-title">${slide.title}</h2>
                <ul class="slide-bullets" style="margin-top: 15px;">
                    ${bulletsHtml}
                </ul>
            </div>
            <div class="slide-stat-card">
                <div class="slide-stat-num">${slide.stat}</div>
                <div class="slide-stat-label">${slide.statLabel}</div>
            </div>
        </div>

        <div class="slide-footer-text">
            Google for Startups Accelerator: ACCESSFriendly LA28 Global Proposal
        </div>
    `;

    // Manage button states
    document.getElementById("btnPrevSlide").disabled = index === 0;
    document.getElementById("btnNextSlide").disabled = index === slides.length - 1;
}

// Navigate through slide deck
function navigateSlide(direction) {
    const newIdx = currentSlideIndex + direction;
    if (newIdx >= 0 && newIdx < slides.length) {
        renderSlide(newIdx);
    }
}

// ============================================================================
// ACoolWORKFORCE - VR Oculus Concessions Simulator & Support Directory
// ============================================================================

// Valley Support Centers Data
const valleyResources = {
    northbsc: {
        name: "North Valley BusinessSource Center",
        address: "13168 Van Nuys Blvd., Pacoima, CA 91331",
        email: "northvalleybsc@iconcdc.org",
        phone: "(818) 302-6114"
    },
    southbsc: {
        name: "South Valley BusinessSource Center",
        address: "14553 Delano St., Suite 212, Van Nuys, CA 91411",
        email: "southvalleybsc@iconcdc.org",
        phone: "(818) 616-4118"
    },
    westbsc: {
        name: "West Valley BusinessSource Center",
        address: "18645 Sherman Way, #114, Reseda, CA 91335",
        email: "westvalleybsc@mcslosangeles.com",
        phone: "(747) 265-6201"
    },
    southwsc: {
        name: "South Valley WorkSource Center & AJCC",
        address: "20920 Warner Center Lane, Suite C, Woodland Hills, CA 91367",
        email: "southvalleywsc@rescare.com",
        phone: "(818) 237-9099"
    },
    northwsc: {
        name: "Northeast San Fernando Valley WorkSource Center",
        address: "LA Mission College Campus Center, 13356 Eldridge Ave, Sylmar, CA 91342",
        email: "northeastwsc@lamission.edu",
        phone: "(818) 482-1754"
    }
};

function showValleyResource(key) {
    const res = valleyResources[key];
    if (res) {
        document.getElementById("resourceName").textContent = res.name;
        document.getElementById("resourceAddress").textContent = `📍 Address: ${res.address}`;
        document.getElementById("resourceEmail").textContent = `✉️ Email: ${res.email}`;
        document.getElementById("resourcePhone").textContent = `📞 Phone: ${res.phone}`;
        
        document.getElementById("diagnosticLogs").textContent += `\n[EWDD-DIRECTORY] Selected Support Center: ${res.name}`;
    }
}

// VR Workforce Simulator Logic
let vrProgression = 45;
let vrCompliance = 98.6;
let vrProfit = 88;

function simulateVRActivity(type) {
    const vrText = document.getElementById("vrInstructionText");
    const handL = document.getElementById("vrHandL");
    const handR = document.getElementById("vrHandR");
    
    // Animate hands inside VR
    if (type === 'counter') {
        handL.setAttribute("cx", "280");
        handL.setAttribute("cy", "275");
        handR.setAttribute("cx", "300");
        handR.setAttribute("cy", "275");
        
        vrProgression = Math.min(100, vrProgression + 15);
        vrCompliance = Math.min(100, parseFloat((vrCompliance + 0.4).toFixed(1)));
        
        vrText.innerHTML = `<strong style="color:var(--color-success);">ADA AUDIT SUCCESSFUL ✓</strong><br>Counter height verified at exactly 33.5 inches. Compliance secured. Star coach Sha'Carri Richardson says: <em>"A clean, level counter means everyone wins!"</em>`;
        document.getElementById("diagnosticLogs").textContent += `\n[ACoolWORKFORCE] Trainee Keith McPherson completed ADA Counter Height Audit.`;
        
    } else if (type === 'assist') {
        handL.setAttribute("cx", "250");
        handL.setAttribute("cy", "285");
        handR.setAttribute("cx", "270");
        handR.setAttribute("cy", "285");
        
        vrProgression = Math.min(100, vrProgression + 20);
        vrProfit = Math.min(100, vrProfit + 4);
        
        vrText.innerHTML = `<strong style="color:var(--accent-teal);">SPECTATOR SERVICE COMPLETED ✓</strong><br>Hydraulic terminal ramp deployed. Processed card ticketing transaction step-free. Star coach Noah Lyles says: <em>"That service speed was championship grade!"</em>`;
        document.getElementById("diagnosticLogs").textContent += `\n[ACoolWORKFORCE] Trainee Keith McPherson assisted spectator with wheelchair boarding at POS terminal.`;
        
    } else if (type === 'evac') {
        handL.setAttribute("cx", "100");
        handL.setAttribute("cy", "240");
        handR.setAttribute("cx", "400");
        handR.setAttribute("cy", "240");
        
        vrProgression = Math.min(100, vrProgression + 25);
        
        vrText.innerHTML = `<strong style="color:var(--color-warning);">EVACUATION DRILL COMPLETED ✓</strong><br>Concessions gate powered down. Guided crowd flow directly to the step-free South Gate ramp. All occupants cleared.`;
        document.getElementById("diagnosticLogs").textContent += `\n[ACoolWORKFORCE] Trainee Keith McPherson completed Concessions Evacuation Drill.`;
    }
    
    // Update metrics in the UI
    document.getElementById("vrProgressionValue").textContent = `${vrProgression}% Complete`;
    document.getElementById("statProgressPercent").textContent = `${vrProgression}%`;
    document.getElementById("barProgressPercent").style.width = `${vrProgression}%`;
    
    document.getElementById("statCompliancePercent").textContent = `${vrCompliance}%`;
    document.getElementById("barCompliancePercent").style.width = `${vrCompliance}%`;
    
    document.getElementById("statProfitPercent").textContent = `${vrProfit}%`;
    document.getElementById("barProfitPercent").style.width = `${vrProfit}%`;
}

// San Fernando Valley Incorporated Cities & Key Districts Database
const valleyCities = {
    burbank: {
        name: "City of Burbank",
        mayor: "Tamala Takahashi",
        mayorTerm: "Term: Dec 2025 - Dec 2026",
        viceMayor: "Zizette Mullins (Vice Mayor)",
        council: ["Konstantine Anthony", "Nikki Perez", "Christopher John Rizzotti"],
        focus: "Prioritizing step-free boarding access at the Burbank Downtown Metrolink transit station and level bus curb transfers."
    },
    calabasas: {
        name: "City of Calabasas",
        mayor: "James R. Bozajian",
        mayorTerm: "Term: Dec 2025 - Dec 2026",
        viceMayor: "Edward Albrecht (Mayor Pro Tem)",
        council: ["Alicia Weintraub", "Peter Kraut", "David J. Shapiro"],
        focus: "Upgrading hiking path accessibility maps and installing tactile crosswalk markers around civic centers."
    },
    glendale: {
        name: "City of Glendale",
        mayor: "Elen Asatryan",
        mayorTerm: "Term: Dec 2025 - Dec 2026",
        viceMayor: "Dan Brotman (Councilmember)",
        council: ["Vartan Gharpetian", "Ardy Kassakhian", "Ara Najarian"],
        focus: "Retrofitting the Glendale Beeline local transit fleet for low-floor boarding and multi-language announcements."
    },
    hiddenhills: {
        name: "City of Hidden Hills",
        mayor: "Joe Loggia",
        mayorTerm: "Term: Dec 2025 - Dec 2026",
        viceMayor: "Stuart E. Siegel (Mayor Pro Tem)",
        council: ["Eniko Gold", "Laura McCorkindale", "Larry G. Weber"],
        focus: "Improving tactile warning curves and accessibility ramps along horseback paths and key civic crosswalks."
    },
    sanfernando: {
        name: "City of San Fernando",
        mayor: "Joel Fajardo",
        mayorTerm: "Term: Dec 2025 - Dec 2026",
        viceMayor: "Victoria Garcia (Vice Mayor)",
        council: ["Mary Mendoza", "Mary Solorio", "Patty Lopez"],
        focus: "Leveling downtown sidewalk ramps and repairing crosswalk audio warning signals for visually impaired citizens."
    },
    pacoima: {
        name: "Pacoima (LA Council District 7)",
        mayor: "Monica Rodriguez",
        mayorTerm: "Term: Dec 2024 - Dec 2028 (Councilmember)",
        viceMayor: "N/A (LA District Representative)",
        council: ["LA City Council District 7 Staff", "Pacoima Neighborhood Council"],
        focus: "Coordinating Orange G-Line Busway level-platform boarding audits and expanding local WorkSource training portals."
    },
    vannuys: {
        name: "Van Nuys (LA Council District 6)",
        mayor: "Imelda Padilla",
        mayorTerm: "Term: Dec 2024 - Dec 2028 (Councilmember)",
        viceMayor: "N/A (LA District Representative)",
        council: ["LA City Council District 6 Staff", "Van Nuys Neighborhood Council"],
        focus: "Upgrading paratransit bus transfer safety corridors around the Van Nuys MTA Transit station and level-platform audits."
    }
};

function showCivicCity(key) {
    const city = valleyCities[key];
    if (city) {
        document.getElementById("civicCityName").textContent = city.name;
        document.getElementById("civicMayor").textContent = city.mayor;
        document.getElementById("civicMayorTerm").textContent = city.mayorTerm;
        document.getElementById("civicViceMayor").textContent = city.viceMayor;
        
        const list = document.getElementById("civicCouncilList");
        list.innerHTML = "";
        city.council.forEach(member => {
            const li = document.createElement("li");
            li.className = "slide-bullet";
            li.style.cssText = "color:var(--text-secondary); font-size:0.9rem;";
            li.textContent = member;
            list.appendChild(li);
        });
        
        document.getElementById("civicFocusArea").textContent = city.focus;
        document.getElementById("diagnosticLogs").textContent += `\n[CIVIC-DOSSIER] Selected Valley City: ${city.name}`;
    }
}

// Toggle mobile sidebar drawer navigation menu
function toggleMobileSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("mobileSidebarOverlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
}

// Copy prompt text to clipboard
function copyPromptText(elementId, button) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.innerText || element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const oldText = button.textContent;
        button.textContent = "Copied! ✓";
        button.style.background = "var(--color-success)";
        button.style.color = "white";
        button.style.borderColor = "var(--color-success)";
        
        setTimeout(() => {
            button.textContent = oldText;
            button.style.background = "";
            button.style.color = "";
            button.style.borderColor = "";
        }, 2000);
        
        document.getElementById("diagnosticLogs").textContent += `\n[CLIPBOARD] Prompt copied: ${elementId}`;
    }).catch(err => {
        console.error("Clipboard copy failed:", err);
    });
}
