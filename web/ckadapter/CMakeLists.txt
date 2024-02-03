cmake_minimum_required(VERSION 3.13)
project(CKAdapter)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)

if (NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release")
endif ()

set(TGFX_BUILD_DRAWERS ON)
set(CMAKE_POLICY_DEFAULT_CMP0077 NEW)
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../../ ./tgfx)

file(GLOB_RECURSE CKADAPTER_FILES src/*.cpp)

if (DEFINED EMSCRIPTEN)
    add_executable(ckadapter ${CKADAPTER_FILES})
    list(APPEND H2D_LINK_OPTIONS --no-entry -lembind -sEXPORT_NAME='CKAdapter' -sWASM=1 -sASYNCIFY
            -sUSE_WEBGL2=1 -sEXPORTED_RUNTIME_METHODS=['GL','Asyncify'] -sALLOW_MEMORY_GROWTH=1
            -sMODULARIZE=1 -sENVIRONMENT='web,worker' -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0)
    if (CMAKE_BUILD_TYPE STREQUAL "Debug")
        list(APPEND H2D_COMPILE_OPTIONS -O0 -g3)
        list(APPEND H2D_LINK_OPTIONS -O0 -g3 -sSAFE_HEAP=1 -Wno-limited-postlink-optimizations)
    else ()
        list(APPEND H2D_COMPILE_OPTIONS -Oz)
        list(APPEND H2D_LINK_OPTIONS -Oz)
    endif ()
else ()
    add_library(ckadapter SHARED ${CKADAPTER_FILES})
endif ()

target_compile_options(ckadapter PUBLIC ${H2D_COMPILE_OPTIONS})
target_link_options(ckadapter PUBLIC ${H2D_LINK_OPTIONS})
target_link_libraries(ckadapter tgfx-drawers tgfx ${CKADAPTER_SHARED_LIBS})
