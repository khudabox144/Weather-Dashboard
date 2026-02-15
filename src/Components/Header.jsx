import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { addTofavContext, searchLocationContext } from '../context';
import useSearch from '../hooks/useSearch';


const Header = () => {
    const [showFav, setShowFav] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { favourites } = useContext(addTofavContext);
    const { setSelectedLocation } = useContext(searchLocationContext);
    const favRef = useRef(null);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const { query, setQuery, suggestions, isSearching, clearSuggestions } = useSearch(300);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (favRef.current && !favRef.current.contains(e.target)) {
                setShowFav(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset active index when suggestions change
    useEffect(() => {
        setActiveIndex(-1);
    }, [suggestions]);

    const selectLocation = useCallback((item) => {
        if (item.latitude && item.longitude) {
            setSelectedLocation({
                name: {
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                },
            });
        } else {
            setSelectedLocation({ cityName: item.location });
        }
        setQuery("");
        clearSuggestions();
        setShowSuggestions(false);
        inputRef.current?.blur();
    }, [setSelectedLocation, setQuery, clearSuggestions]);

    const handleSearch = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const q = query.trim();
        if (!q) return;

        // If a suggestion is highlighted, pick it
        if (activeIndex >= 0 && suggestions[activeIndex]) {
            selectLocation(suggestions[activeIndex]);
            return;
        }

        // If there are suggestions and user hits Enter, pick the first
        if (suggestions.length > 0) {
            selectLocation(suggestions[0]);
            return;
        }

        // Fallback: search by city name via the weather API
        setSelectedLocation({ cityName: q });
        setQuery("");
        clearSuggestions();
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    const handleFavSelect = (fav) => {
        setSelectedLocation({ name: fav });
        setShowFav(false);
    };

    // Country code → flag emoji
    const getFlag = (countryCode) => {
        if (!countryCode || countryCode.length !== 2) return "";
        const offset = 127397;
        return String.fromCodePoint(
            ...countryCode.toUpperCase().split("").map((c) => c.charCodeAt(0) + offset)
        );
    };

    return (
        <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
            <nav className="container mx-auto flex items-center justify-between py-3 md:py-4 px-4 lg:px-6">
                {/* Logo */}
                <a href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                    <img className="h-7 md:h-9" src="/assets/logo.svg" alt="Weather Dashboard" />
                </a>

                {/* Right side controls */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Search with suggestions */}
                    <div className="relative" ref={searchRef}>
                        <form onSubmit={handleSearch}>
                            <div className={`flex items-center glass-card-light px-3 py-2 md:px-4 md:py-2.5 transition-all duration-300 !rounded-full ${showSuggestions && suggestions.length > 0 ? "bg-white/20 border-white/30" : "focus-within:bg-white/20 focus-within:border-white/30"}`}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => {
                                        if (query.trim().length > 0) setShowSuggestions(true);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search any city..."
                                    className="bg-transparent text-white w-28 sm:w-36 md:w-52 lg:w-64 text-xs md:text-sm outline-none border-none placeholder:text-white/50 font-light"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                {/* Loading spinner or search icon */}
                                {isSearching ? (
                                    <div className="ml-2 w-4 h-4 md:w-[18px] md:h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <button type="submit" className="ml-2 hover:scale-110 transition-transform active:scale-95">
                                        <img src="/assets/search.svg" className="w-4 h-4 md:w-[18px] md:h-[18px] opacity-70" alt="search" />
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Suggestions dropdown */}
                        {showSuggestions && query.trim().length > 0 && (
                            <div className="absolute left-0 right-0 md:left-auto md:right-auto md:w-80 top-full mt-2 glass-card p-0 overflow-hidden animate-slide-down shadow-2xl shadow-black/40 z-50">
                                {suggestions.length > 0 ? (
                                    <ul className="max-h-72 overflow-y-auto custom-scrollbar py-1" role="listbox">
                                        {suggestions.map((item, idx) => (
                                            <li key={`${item.location}-${item.country}-${idx}`} role="option" aria-selected={idx === activeIndex}>
                                                <button
                                                    onClick={() => selectLocation(item)}
                                                    onMouseEnter={() => setActiveIndex(idx)}
                                                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors group ${
                                                        idx === activeIndex
                                                            ? "bg-white/15"
                                                            : "hover:bg-white/10"
                                                    }`}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-base">
                                                        {getFlag(item.country) || (
                                                            <img src="/assets/pin.svg" alt="" className="w-4 h-4 opacity-60" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium truncate transition-colors ${
                                                            idx === activeIndex ? "text-white" : "text-white/80 group-hover:text-white"
                                                        }`}>
                                                            {highlightMatch(item.location, query)}
                                                        </p>
                                                        <p className="text-[11px] text-white/40 truncate">
                                                            {[item.state, item.country].filter(Boolean).join(", ")}
                                                            {item.source === "local" && (
                                                                <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">Quick</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {idx === activeIndex && (
                                                        <span className="text-[10px] text-white/30 font-mono flex-shrink-0">↵</span>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    !isSearching && query.trim().length >= 2 && (
                                        <div className="px-4 py-6 text-center">
                                            <p className="text-white/40 text-sm">No cities found</p>
                                            <p className="text-white/25 text-xs mt-1">
                                                Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">Enter</kbd> to search &ldquo;{query.trim()}&rdquo;
                                            </p>
                                        </div>
                                    )
                                )}

                                {/* Hint footer */}
                                {suggestions.length > 0 && (
                                    <div className="px-4 py-2 border-t border-white/5 bg-white/[0.03] flex items-center justify-between">
                                        <span className="text-[10px] text-white/25">
                                            <kbd className="bg-white/10 px-1 py-0.5 rounded font-mono mr-1">↑↓</kbd> navigate
                                            <kbd className="bg-white/10 px-1 py-0.5 rounded font-mono mx-1">↵</kbd> select
                                        </span>
                                        <span className="text-[10px] text-white/25">{suggestions.length} result{suggestions.length !== 1 ? "s" : ""}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Favourites */}
                    <div className="relative" ref={favRef}>
                        <button
                            onClick={() => setShowFav(!showFav)}
                            className="glass-card-light !rounded-full px-3 py-2 md:px-4 md:py-2.5 flex items-center gap-2 transition-all duration-300 hover:bg-white/20 active:scale-95"
                            aria-label="Favourite Locations"
                        >
                            <img src="/assets/heart-red.svg" alt="" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden sm:inline text-xs md:text-sm font-medium text-white/90">Favourites</span>
                            {favourites.length > 0 && (
                                <span className="bg-red-500 text-[10px] text-white w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
                                    {favourites.length}
                                </span>
                            )}
                        </button>

                        {showFav && (
                            <div className="absolute right-0 top-full mt-2 w-72 md:w-80 glass-card p-0 overflow-hidden animate-slide-down shadow-2xl shadow-black/30">
                                <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                                    <h3 className="text-sm font-bold text-white/90 flex items-center gap-2">
                                        <img src="/assets/heart-red.svg" alt="" className="w-4 h-4" />
                                        Favourite Locations
                                    </h3>
                                </div>

                                {favourites.length === 0 ? (
                                    <div className="px-4 py-8 text-center">
                                        <img src="/assets/heart.svg" alt="" className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                        <p className="text-white/40 text-sm">No favourites yet</p>
                                        <p className="text-white/25 text-xs mt-1">Search for a city and add it!</p>
                                    </div>
                                ) : (
                                    <ul className="max-h-64 overflow-y-auto custom-scrollbar py-1">
                                        {favourites.map((fav, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleFavSelect(fav)}
                                                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors group"
                                                >
                                                    <img src="/assets/pin.svg" alt="" className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity" />
                                                    <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{fav.location}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

/**
 * Highlights the matching portion of a city name.
 */
function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.trim().toLowerCase());
    if (idx === -1) return text;

    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.trim().length);
    const after = text.slice(idx + query.trim().length);

    return (
        <>
            {before}
            <span className="text-white font-semibold">{match}</span>
            {after}
        </>
    );
}

export default Header;